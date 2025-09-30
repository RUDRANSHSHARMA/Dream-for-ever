import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaTag, FaArrowLeft } from 'react-icons/fa';
import { blogAPI } from '../utils/api';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBySlug(slug);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-message">
            <h2>Blog Post Not Found</h2>
            <p>{error || 'The blog post you are looking for does not exist.'}</p>
            <Link to="/blog" className="btn btn-primary">
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-hero">
        <div className="container">
          <Link to="/blog" className="back-button">
            <FaArrowLeft /> Back to Blog
          </Link>

          <motion.div
            className="blog-post-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{blog.title}</h1>
            
            <div className="blog-post-meta">
              <span className="meta-item">
                <FaClock /> {formatDate(blog.createdAt)}
              </span>
              <span className="meta-item">
                <FaEye /> {blog.views} views
              </span>
              <span className="meta-item">
                By {blog.author}
              </span>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-post-tags">
                <FaTag />
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="blog-post-tag">{tag}</span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container">
        <motion.article
          className="blog-post-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {blog.image && (
            <div className="blog-post-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}

          <div 
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </motion.article>

        <motion.div
          className="blog-post-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/blog" className="btn btn-primary">
            <FaArrowLeft /> Back to All Posts
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
