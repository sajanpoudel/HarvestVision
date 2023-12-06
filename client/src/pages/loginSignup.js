import Header from "./header";
import Footer from "./footer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const TOKEN_KEY = "harvestvision_token";

const LoginSignUp = () => {
  const keepToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.assign("/");
  };

  return (
    <section>
      <Header />
      <main>
        <div className="login-container">
          <div className="signin login_card">
            <h2 className="heading2">Sign In</h2>
            <SignInForm onSignedIn={keepToken} />
          </div>
          <div className="signup login_card">
            <h2 className="heading2">Sign Up</h2>
            <SignUpForm />
          </div>
        </div>
      </main>

      <Footer />
    </section>
  );
};
export default LoginSignUp;
