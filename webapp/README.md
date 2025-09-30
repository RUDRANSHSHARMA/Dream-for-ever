# Rudransh Sharma - Portfolio Website

A modern, fully responsive personal portfolio website with blog management system, built with React and Node.js.

> **🚀 Want to get started quickly?** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide!
> 
> **📦 Ready to deploy?** Check out [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions.

## 🌟 Features

### Frontend
- **Hero Section**: Eye-catching landing page with smooth animations
- **About Section**: Education, certifications, languages, and availability
- **Resume Section**: Professional experience, skills, and technical proficiencies
- **Projects Section**: Showcase of key projects and achievements with impact stats
- **Blog Section**: Read-only public blog with tag filtering
- **Contact Section**: Functional contact form with email integration
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion and AOS for elegant scroll animations
- **SEO Optimized**: Meta tags and semantic HTML for better search rankings

### Backend
- **RESTful API**: Express.js backend with MongoDB
- **Blog Management**: Full CRUD operations for blog posts
- **Authentication**: JWT-based admin authentication
- **Contact Form**: Email notifications for new messages
- **Admin Dashboard**: Secure panel for managing blog posts

### Admin Panel
- **Secure Login**: JWT token authentication
- **Blog CRUD**: Create, read, update, and delete blog posts
- **Draft System**: Publish or save as draft
- **Tag Management**: Add tags for better content organization
- **View Analytics**: Track blog post views

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- AOS (Animate On Scroll)
- Axios (API calls)
- React Icons
- React Toastify (notifications)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Nodemailer (email)
- Express Validator

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd webapp
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings
# Default admin credentials:
# Email: rudransh.sharma.292006@gmail.com
# Password: admin123

# Start MongoDB (if not running)
mongod

# Start the backend server
npm start

# Or for development with auto-reload
npm run dev
```

Backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Configure API URL (optional)
# Edit frontend/.env if needed
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React development server
npm start
```

Frontend will run on http://localhost:3000

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=rudransh.sharma.292006@gmail.com
ADMIN_PASSWORD=admin123
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Usage

### Public Website
1. Navigate to http://localhost:3000
2. Browse through sections: Home, About, Resume, Projects, Contact
3. Read blog posts at /blog
4. Submit contact form

### Admin Access
1. Go to http://localhost:3000/admin/login
2. Login with credentials:
   - Email: rudransh.sharma.292006@gmail.com
   - Password: admin123
3. Manage blog posts from the dashboard

### Creating Blog Posts
1. Login to admin dashboard
2. Click "Create New Post"
3. Fill in:
   - Title
   - Excerpt (max 200 characters)
   - Content (supports line breaks)
   - Tags (comma-separated)
   - Image URL (optional)
   - Published status
4. Click "Create Post"

## 🎨 Customization

### Update Personal Information
Edit `frontend/src/utils/data.js` to update:
- Personal info (name, email, phone, location)
- Education details
- Certifications
- Skills and competencies
- Work experience
- Projects
- Technical proficiencies

### Styling
- Main colors: `frontend/src/index.css` (CSS variables)
- Component styles: Individual CSS files in components folder

## 📁 Project Structure

```
webapp/
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── .env            # Environment variables
│   ├── server.js       # Express server
│   └── package.json
│
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # API and data
│   │   ├── styles/     # CSS files
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   ├── .env           # Frontend config
│   └── package.json
│
└── README.md
```

## 🔐 Security Notes

- Change default admin password in production
- Use strong JWT secret
- Enable CORS only for trusted domains
- Use HTTPS in production
- Store sensitive data in environment variables
- Validate all user inputs

## 📧 Email Configuration (Optional)

To enable contact form email notifications:

1. Get Gmail App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

2. Update backend/.env:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables
2. Update MONGODB_URI with cloud database (MongoDB Atlas)
3. Update FRONTEND_URL with production URL
4. Deploy backend code

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build production version: `npm run build`
2. Set REACT_APP_API_URL to production backend URL
3. Deploy build folder

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### Port Already in Use
- Change PORT in backend/.env
- Update REACT_APP_API_URL accordingly

### CORS Errors
- Verify FRONTEND_URL in backend/.env
- Check CORS configuration in server.js

## 📄 License

This project is created for Rudransh Sharma's personal portfolio.

## 👤 Contact

**Rudransh Sharma**
- Email: rudransh.sharma.292006@gmail.com
- Phone: +91 95283 86544
- Location: Aligarh, Uttar Pradesh
- LinkedIn: [linkedin.com/in/rudransh-sharma](https://linkedin.com/in/rudransh-sharma)

## 🙏 Acknowledgments

- Built with React and Node.js
- Animations by Framer Motion and AOS
- Icons by React Icons
- Gradient inspiration from various design resources

---

Made with ❤️ by Rudransh Sharma
