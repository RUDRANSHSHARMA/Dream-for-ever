import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduate, FaCertificate, FaLanguage, FaBriefcase } from 'react-icons/fa';
import { education, certifications, languages, availability } from '../utils/data';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know more about my background, education, and professional journey
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="about-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="subsection-title">
            <FaGraduate className="subsection-icon" />
            Education
          </h3>
          <div className="education-grid">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="education-card card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
              >
                <div className="edu-icon">{edu.icon}</div>
                <h4>{edu.degree}</h4>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-duration">{edu.duration}</p>
                {edu.percentage && (
                  <p className="edu-percentage">Grade: {edu.percentage}</p>
                )}
                {edu.status && (
                  <span className="edu-status">{edu.status}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="about-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="subsection-title">
            <FaCertificate className="subsection-icon" />
            Certifications & Recognition
          </h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="certification-card card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
              >
                <div className="cert-icon">{cert.icon}</div>
                <h4>{cert.name}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
                <p className="cert-description">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages & Availability */}
        <motion.div
          className="about-info-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="info-card card" data-aos="fade-right">
            <h3 className="info-title">
              <FaLanguage className="subsection-icon" />
              Languages
            </h3>
            <ul className="languages-list">
              {languages.map((lang, index) => (
                <li key={index}>
                  <strong>{lang.name}</strong>
                  <span>{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-card card" data-aos="fade-left">
            <h3 className="info-title">
              <FaBriefcase className="subsection-icon" />
              Availability
            </h3>
            <div className="availability-info">
              <p className="availability-status">{availability.status}</p>
              <p className="availability-arrangement">{availability.workArrangement}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
