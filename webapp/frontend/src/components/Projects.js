import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { projects } from '../utils/data';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Key Projects & Achievements</h2>
          <p className="section-subtitle">
            Showcasing my impactful projects and professional accomplishments
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-icon">{project.icon}</div>
              
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-year">{project.year}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-achievements">
                <h4>Key Achievements:</h4>
                <ul>
                  {project.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <FaCheckCircle className="achievement-icon" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          className="impact-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="stat-number">2+</div>
            <div className="stat-label">Years Experience</div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="stat-number">50+</div>
            <div className="stat-label">Research Papers</div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="stat-number">25+</div>
            <div className="stat-label">Design Projects</div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
            <div className="stat-number">35%</div>
            <div className="stat-label">Engagement Increase</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
