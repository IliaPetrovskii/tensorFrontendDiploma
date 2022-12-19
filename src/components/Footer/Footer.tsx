//Компонент футера страниц
export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-top-column">
                    <h2 className="footer-heading">Company</h2>
                    <ul className="footer-links">
                        <li>About Last.fm</li>
                        <li>Contact Us</li>
                        <li>Jobs</li>
                    </ul>
                </div>
                <div className="footer-top-column">
                    <h2 className="footer-heading">Help</h2>
                    <ul className="footer-links">
                        <li>Track My Music</li>
                        <li>Community Support</li>
                        <li>Community Guidelines</li>
                        <li>Help</li>
                    </ul>
                </div>
                <div className="footer-top-column">
                    <h2 className="footer-heading">Goodies</h2>
                    <ul className="footer-links">
                        <li>Download Scrobbler</li>
                        <li>Developer API</li>
                        <li>Free Music Downloads</li>
                        <li>Merchandise</li>
                    </ul>
                </div>
                <div className="footer-top-column">
                    <h2 className="footer-heading">Account</h2>
                    <ul className="footer-links">
                        <li>Sign Up</li>
                        <li>Log In</li>
                        <li>Subscribe</li>
                    </ul>
                </div>
                <div className="footer-top-column">
                    <h2 className="footer-heading">Follow Us</h2>
                    <ul className="footer-links">
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </div>
            <hr className="solid"/>
            <div className="footer-bottom">
                <div className="footer-bottom-info">
                    <div className="language-choose">
                        <div className="footer-lang"><strong>English</strong></div>
                        <div className="footer-lang">Deutsch</div>
                        <div className="footer-lang">Español</div>
                        <div className="footer-lang">Français</div>
                        <div className="footer-lang">Italiano</div>
                        <div className="footer-lang">日本語</div>
                        <div className="footer-lang">Polski</div>
                        <div className="footer-lang">Português</div>
                        <div className="footer-lang">Русский</div>
                        <div className="footer-lang">Svenska</div>
                        <div className="footer-lang">Türkçe</div>
                        <div className="footer-lang">简体中文</div>
                    </div>
                    <p className="footer-timezone">Time zone: <strong>Europe/Moscow</strong></p>
                    <div className="footer-policy">
                        <div className="footer-policy-item">CBS Interactive © 2022 Last.fm Ltd. All rights reserved
                        </div>
                        <div className="footer-policy-item">Terms of Use</div>
                        <div className="footer-policy-item">Privacy Policy</div>
                        <div className="footer-policy-item">Legal Policies</div>
                        <div className="footer-policy-item">Cookies Policy</div>
                        <div className="footer-policy-item">Cookie Information</div>
                        <div className="footer-policy-item">Jobs at ViacomCBS</div>
                        <div className="footer-policy-item">Last.fm Music</div>
                    </div>
                </div>
                <p className="audioscrobbler">Audioscrobbler</p>
            </div>
        </footer>
    )
}