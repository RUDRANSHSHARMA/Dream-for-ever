import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { blogAPI, authAPI } from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    image: '',
    published: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      await authAPI.verify();
      fetchBlogs();
    } catch (error) {
      toast.error('Please login to access dashboard');
      navigate('/admin/login');
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllAdmin();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        tags: blog.tags ? blog.tags.join(', ') : '',
        image: blog.image || '',
        published: blog.published
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        image: '',
        published: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error('Please fill in all required fields');
      return;
    }

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, blogData);
        toast.success('Blog updated successfully');
      } else {
        await blogAPI.create(blogData);
        toast.success('Blog created successfully');
      }
      handleCloseModal();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogAPI.delete(id);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage your blog posts</p>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container dashboard-content">
        <div className="dashboard-actions">
          <button onClick={() => handleOpenModal()} className="btn btn-primary">
            <FaPlus /> Create New Post
          </button>
        </div>

        <div className="blogs-table">
          {blogs.length === 0 ? (
            <div className="no-blogs">
              <p>No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div className="blog-title-cell">
                        <strong>{blog.title}</strong>
                        <span className="blog-excerpt">{blog.excerpt.substring(0, 60)}...</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="views-cell">
                        <FaEye /> {blog.views || 0}
                      </div>
                    </td>
                    <td>{formatDate(blog.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleOpenModal(blog)}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">Excerpt * (Max 200 characters)</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="2"
                  maxLength="200"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  rows="10"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="design, AI, research"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                  />
                  <span>Publish immediately</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingBlog ? 'Update' : 'Create'} Post
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
