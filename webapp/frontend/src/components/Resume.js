import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import { skills, experience, technicalProficiencies } from '../utils/data';
import './Resume.css';

const Resume = () => {
  return (
    <section id="resume" className="section section-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            My professional experience, skills, and technical proficiencies
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div
          className="resume-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="subsection-title-light">
            <FaBriefcase className="subsection-icon" />
            Professional Experience
          </h3>
          
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              data-aos="fade-up"
              whileHover={{ scale: 1.02 }}
            >
              <div className="exp-header">
                <div className="exp-icon">{exp.icon}</div>
                <div className="exp-info">
                  <h4>{exp.title}</h4>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-duration">{exp.duration}</p>
                  <span className="exp-type">{exp.type}</span>
                </div>
              </div>
              
              <ul className="exp-achievements">
                {exp.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaCheckCircle className="check-icon" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          className="resume-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="subsection-title-light">Core Competencies</h3>
          
          <div className="skills-grid">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                className="skill-category-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
              >
                <div className="skill-header">
                  <span className="skill-icon">{skillCategory.icon}</span>
                  <h4>{skillCategory.category}</h4>
                </div>
                <div className="skill-items">
                  {skillCategory.items.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Proficiencies */}
        <motion.div
          className="resume-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="subsection-title-light">Technical Proficiencies</h3>
          
          <div className="proficiencies-grid">
            {technicalProficiencies.map((category, index) => (
              <motion.div
                key={index}
                className="proficiency-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h4 className="proficiency-category">{category.category}</h4>
                <ul className="proficiency-list">
                  {category.skills.map((skill, idx) => (
                    <li key={idx}>
                      <div className="proficiency-item">
                        <span className="proficiency-name">{skill.name}</span>
                        <span className={`proficiency-level level-${skill.level.toLowerCase()}`}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="proficiency-bar">
                        <motion.div
                          className={`proficiency-fill fill-${skill.level.toLowerCase()}`}
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: skill.level === 'Expert' ? '95%' : 
                                   skill.level === 'Advanced' ? '85%' : '70%' 
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
