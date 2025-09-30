import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaTag } from 'react-icons/fa';
import { blogAPI } from '../utils/api';
import './BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all unique tags
  const allTags = ['all', ...new Set(blogs.flatMap(blog => blog.tags || []))];

  // Filter blogs by tag
  const filteredBlogs = selectedTag === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.tags && blog.tags.includes(selectedTag));

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights, stories, and experiences from my creative journey
          </motion.p>
        </div>
      </div>

      <div className="container blog-container">
        {/* Tag Filter */}
        {allTags.length > 1 && (
          <motion.div
            className="blog-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="no-blogs">
            <h3>No blog posts found</h3>
            <p>Check back later for new content!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${blog.slug}`} className="blog-card">
                  {blog.image && (
                    <div className="blog-image">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                  )}
                  
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    
                    <div className="blog-meta">
                      <span className="meta-item">
                        <FaClock /> {formatDate(blog.createdAt)}
                      </span>
                      <span className="meta-item">
                        <FaEye /> {blog.views || 0} views
                      </span>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="blog-card-tags">
                        <FaTag />
                        {blog.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <span className="read-more">Read More →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
