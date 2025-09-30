const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all published blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/admin/all
// @desc    Get all blogs (including unpublished) - Admin only
// @access  Private
router.get('/admin/all', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, excerpt, tags, image, published } = req.body;

    // Validate required fields
    if (!title || !content || !excerpt) {
      return res.status(400).json({ message: 'Please provide title, content, and excerpt' });
    }

    // Create slug from title
    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug exists and make it unique
    let slugExists = await Blog.findOne({ slug });
    let counter = 1;
    let originalSlug = slug;
    
    while (slugExists) {
      slug = `${originalSlug}-${counter}`;
      slugExists = await Blog.findOne({ slug });
      counter++;
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      tags: tags || [],
      image: image || '',
      published: published !== undefined ? published : true,
      slug
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, excerpt, tags, image, published } = req.body;

    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;
    if (tags) blog.tags = tags;
    if (image !== undefined) blog.image = image;
    if (published !== undefined) blog.published = published;

    // Update slug if title changed
    if (title && title !== blog.title) {
      let newSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      let slugExists = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      let counter = 1;
      let originalSlug = newSlug;
      
      while (slugExists) {
        newSlug = `${originalSlug}-${counter}`;
        slugExists = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
        counter++;
      }

      blog.slug = newSlug;
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
