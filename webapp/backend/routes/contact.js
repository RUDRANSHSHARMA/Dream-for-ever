const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;

      // Save to database
      const contact = new Contact({
        name,
        email,
        subject,
        message
      });

      await contact.save();

      // Send email notification (optional - requires email configuration)
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          const transporter = createTransporter();
          
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `Portfolio Contact: ${subject}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `
          };

          await transporter.sendMail(mailOptions);
        }
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({ 
        message: 'Message sent successfully! I will get back to you soon.',
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

// @route   GET /api/contact
// @desc    Get all contact submissions - Admin only
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status - Admin only
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = status;
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
