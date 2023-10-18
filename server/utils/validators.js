const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

export const isValidEmail = (value) =>
  typeof value === "string" && EMAIL_PATTERN.test(value.trim());

// A password needs at least 8 characters with a letter and a digit.
export const isStrongPassword = (value) =>
  typeof value === "string" &&
  value.length >= MIN_PASSWORD_LENGTH &&
  /[A-Za-z]/.test(value) &&
  /[0-9]/.test(value);
