# Quick Start Guide

Get your portfolio website running in 5 minutes!

## 🚀 Super Quick Start

```bash
# 1. Run setup script
./setup.sh

# 2. Start MongoDB (if not running)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB

# 3. Start development servers
./start-dev.sh
```

That's it! Your website will open at http://localhost:3000

## 📋 Manual Setup (If scripts don't work)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
cd ..
```

### Step 2: Configure Environment

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
ADMIN_EMAIL=rudransh.sharma.292006@gmail.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🎯 What You Get

### Public Website (http://localhost:3000)
- **Hero Section**: Landing page with your intro
- **About**: Education, certifications, languages
- **Resume**: Experience, skills, technical proficiencies
- **Projects**: Key achievements with stats
- **Blog**: Read blog posts
- **Contact**: Working contact form

### Admin Panel (http://localhost:3000/admin/login)
**Default Credentials:**
- Email: `rudransh.sharma.292006@gmail.com`
- Password: `admin123`

**Features:**
- Create, edit, delete blog posts
- Manage tags and categories
- Publish or save as draft
- Track blog views

## 📝 First Steps After Setup

### 1. Update Your Information
Edit `frontend/src/utils/data.js` to change:
- Personal details (name, email, phone)
- Education history
- Work experience
- Skills and certifications
- Projects

### 2. Change Admin Password
1. Login to admin panel
2. (Password change feature coming soon)
3. Or update in MongoDB directly

### 3. Create Your First Blog Post
1. Go to http://localhost:3000/admin/login
2. Login with credentials above
3. Click "Create New Post"
4. Fill in:
   - Title
   - Excerpt (short description)
   - Content
   - Tags (comma-separated)
   - Image URL (optional)
5. Click "Create Post"

### 4. Test Contact Form
1. Go to http://localhost:3000
2. Scroll to Contact section
3. Fill out the form
4. Submit
5. Check MongoDB for the submission

## 🛠️ Common Issues & Solutions

### MongoDB Connection Error
**Problem:** Cannot connect to MongoDB
**Solution:**
```bash
# Check if MongoDB is running
pgrep mongod

# Start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port 3000 Already in Use
**Problem:** Port 3000 is occupied
**Solution:**
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or change port in frontend
PORT=3001 npm start
```

### Port 5000 Already in Use
**Problem:** Port 5000 is occupied
**Solution:**
Update `backend/.env`:
```env
PORT=5001
```
And update `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Admin Login Fails
**Problem:** Invalid credentials error
**Solution:**
1. Check `backend/.env` has correct credentials
2. Restart backend server
3. Check MongoDB is running and admin user exists

### Blog Posts Not Showing
**Problem:** Empty blog page
**Solution:**
1. Create blog posts in admin panel
2. Make sure they're published (not draft)
3. Check browser console for API errors

## 📦 Project Structure Overview

```
webapp/
├── backend/                # Node.js/Express API
│   ├── config/            # Database config
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth middleware
│   ├── .env              # Environment variables
│   └── server.js         # Main server file
│
├── frontend/              # React application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # API calls & data
│   │   └── App.js        # Main app
│   └── .env             # Frontend config
│
├── README.md             # Full documentation
├── QUICKSTART.md         # This file
├── DEPLOYMENT.md         # Deployment guide
├── setup.sh             # Setup script
└── start-dev.sh         # Start script
```

## 🎨 Customization Tips

### Change Colors
Edit `frontend/src/index.css`:
```css
:root {
  --primary-color: #2563eb;    /* Main blue */
  --secondary-color: #1e40af;  /* Darker blue */
  --accent-color: #3b82f6;     /* Light blue */
}
```

### Change Font
Edit `frontend/public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Then update `frontend/src/index.css`:
```css
body {
  font-family: 'YourFont', sans-serif;
}
```

### Add Social Media Links
Edit `frontend/src/utils/data.js`:
```javascript
export const personalInfo = {
  // ... existing fields
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername",
};
```

## 🚀 Ready to Deploy?

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Deploying to Vercel/Netlify (Frontend)
- Deploying to Railway/Render (Backend)
- MongoDB Atlas setup
- SSL configuration
- Production checklist

## 📚 Need More Help?

- Full Documentation: [README.md](README.md)
- Deployment Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Contact: rudransh.sharma.292006@gmail.com

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Website loads at http://localhost:3000
- [ ] All sections are visible (Hero, About, Resume, Projects, Contact)
- [ ] Smooth scroll animations work
- [ ] Responsive design works on mobile (resize browser)
- [ ] Blog page shows (even if empty)
- [ ] Admin login works
- [ ] Can create a blog post
- [ ] New blog post appears on blog page
- [ ] Contact form submits successfully
- [ ] No console errors in browser

## 🎉 You're All Set!

Your portfolio website is now running. Start customizing it with your own:
- Personal information
- Projects
- Blog posts
- Design preferences

Happy coding! 🚀
