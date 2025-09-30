import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../utils/data';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">Rudransh<span>.</span></h3>
            <p className="footer-description">
              Creative professional specializing in graphic design, content creation, and research analysis.
              Let's bring your ideas to life!
            </p>
            <div className="footer-social">
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="social-link"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('about')}>About</button></li>
              <li><button onClick={() => scrollToSection('resume')}>Resume</button></li>
              <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <FaEnvelope className="contact-icon" />
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>{personalInfo.location}</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Stay updated with my latest projects and blog posts.
            </p>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="btn btn-primary"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Rudransh Sharma. Made with <FaHeart className="heart-icon" /> 
          </p>
          <div className="footer-bottom-links">
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
