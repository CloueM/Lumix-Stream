import "../styles/footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/lumix-logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Lumix" className="footer-logo" />
            <p className="footer-description">
              Your favorite platform to explore, discover, and bookmark movies
            </p>
          </div>

          <div className="footer-nav">
            <h3 className="nav-title">Navigation</h3>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/search" className="nav-link">Search</Link>
              <Link to="/bookmark" className="nav-link">Bookmarks</Link>
              <Link to="/about" className="nav-link">About Lumix</Link>
            </div>
          </div>

          <div className="footer-network">
            <h3 className="network-title">Connect With Me</h3>
            <div className="network-icons">
              <a
                href="https://www.linkedin.com/in/cloue-macadangdang-365133240"
                target="_blank"
                rel="noopener noreferrer"
                className="network-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:senp41.mac@gmail.com"
                className="network-link"
                aria-label="Email"
              >
                <MdEmail />
              </a>
              <a
                href="https://clouemac.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="network-link"
                aria-label="Portfolio"
              >
                <BiGlobe />
              </a>
              <a
                href="https://github.com/CloueM"
                target="_blank"
                rel="noopener noreferrer"
                className="network-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Lumix. All rights reserved.
          </p>
          <div className="legal-links">
            <Link to="/privacy-policy" className="legal-link">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="legal-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
