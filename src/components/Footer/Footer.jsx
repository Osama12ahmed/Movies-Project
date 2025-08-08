import './footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="brand-logo">
                        <h2>Cine<span>Peek</span></h2>
                    </div>
                    <p className="brand-description">
                        Your ultimate gateway to the world of cinema. Discover, explore, and enjoy the magic of movies.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="link-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3>Stay Updated</h3>
                    <p>Get the latest movie news and updates delivered to your inbox.</p>
                    <div className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="newsletter-input"
                        />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2024 CinePeek. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms of Service</Link>
                        <Link to="/">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}