const Footer = () => {
    return <footer>
        <p>&copy; Sajan Poudel, All Rights Reserved</p>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </nav>
        <div>
            <p>Follow us on social media:</p>
            <ul className="social-media">
                <li>
                    <a href="#">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div>

            <div className="subscribe-container">
                <p>Subscribe to our newsletter:</p>
                <input type="email" placeholder="Enter your email address"/>
                <button className="subscribe">Subscribe</button>
            </div>
        </div>
    </footer>

}
export default Footer
