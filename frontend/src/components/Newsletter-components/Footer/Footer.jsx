import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // --- IMPORTANT: Import Link for routing
import './Footer.css'; // Your existing CSS file
import SubscriptionForm from '../shared/SubscriptionForm';

// Import your images so they work after deployment
import logo from "../../../../assets/lit-logo.png";
import emailIcon from "../../../../assets/email-logo.svg";
import linkedinIcon from "../../../../assets/linkedin-logo.svg";
import instagramIcon from "../../../../assets/instagram-logo.svg";
import twitterIcon from "../../../../assets/twitter-logo.svg";
import googlePlayIcon from "../../../../assets/Google play.svg";
import appStoreIcon from "../../../../assets/App store.svg";



const Footer = () => {
  // --- ADDED: State to control the email input ---
  const [email, setEmail] = useState('');

  // --- ADDED: Function to handle the subscribe button click ---
  const handleSubscribe = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    // In a real app, you would send the email to a backend here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail(''); // Clear the input after submission
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-section">
            <Link to="/"> {/* Make the logo a link to home */}
              <img src={logo} alt="LIT Logo" className="footer-logo" />
            </Link>
          </div>

          {/* --- FIX: Changed <a> tags to <Link> for internal navigation --- */}
          <div className="footer-main-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Services</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div className="footer-secondary">
          <div className="footer-join-section">
            <h3>Join our Community</h3>
            <SubscriptionForm inputClassName="footer-email-input" buttonClassName="footer-subscribe-btn" containerClassName="footer-email-container" />
          </div>

          <div className="footer-contact-section">
            <div className="footer-contact-item">
              <span>Email</span>
              <a href="mailto:info@luxuryintaste.com">
                <img src={emailIcon} alt="Email" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/company/luxury-in-taste-lit/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Instagram</span>
              <a href="https://www.instagram.com/luxuryintaste?utm_source=qr&igsh=MTU3NTlmNWdzY25kYw==" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Twitter</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="footer-store-buttons">
            {/* --- FIX: Changed buttons to links to prevent CSP errors and make them functional --- */}
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-button google-play"
            >
              <img src={googlePlayIcon} alt="Get it on Google Play" />
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-button app-store"
            >
              <img src={appStoreIcon} alt="Download on the App Store" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright">© 2024 Luxury In Taste. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;