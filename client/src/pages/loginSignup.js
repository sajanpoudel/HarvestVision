import Header from "./header"
import Footer
 from "./footer"
const LoginSignUp =() =>
{
    return <section>
            <Header/>
            <main>
           
            <div className="login-container">
                    <div className="signin login_card">
                        <h2 className="heading2">Sign In</h2>
                        <form>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username"/>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password"/>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <div className="signup login_card">
                        <h2 className="heading2">Sign Up</h2>
                        <form>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username"/>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email"/>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password"/>
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input type="password" id="confirm-password" name="confirm-password"/>
                            <button type="submit">Signup</button>
                        </form>
                    </div>
                </div>
                </main>
           

            <Footer/>

    </section>

}
export default LoginSignUp