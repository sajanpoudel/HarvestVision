// Slows down password guessing: after too many failed logins for one email the account is locked for a while.
export const MAX_FAILURES = 5;
export const LOCK_MS = 10 * 60 * 1000;

export function createLoginLimiter({ maxFailures = MAX_FAILURES, lockMs = LOCK_MS, now = Date.now } = {}) {
  const failures = new Map();

  const key = (email) => String(email || "").trim().toLowerCase();

  return {
    // Milliseconds the caller still has to wait, or 0 when a login attempt is allowed.
    waitMs(email) {
      const entry = failures.get(key(email));
      if (!entry || entry.count < maxFailures) return 0;
      const left = entry.lastAt + lockMs - now();
      if (left <= 0) {
        failures.delete(key(email));
        return 0;
      }
      return left;
    },
    recordFailure(email) {
      const entry = failures.get(key(email)) || { count: 0, lastAt: 0 };
      failures.set(key(email), { count: entry.count + 1, lastAt: now() });
    },
    recordSuccess(email) {
      failures.delete(key(email));
    },
  };
}
