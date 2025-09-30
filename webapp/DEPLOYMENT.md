# Deployment Guide

This guide will help you deploy your portfolio website to production.

## Prerequisites

- MongoDB Atlas account (for cloud database)
- Node.js hosting (Heroku, Railway, Render, or similar)
- Static hosting for React (Vercel, Netlify, or similar)

## Option 1: Deploy Backend to Railway

### Step 1: Prepare Backend

1. Create `backend/.gitignore` if not exists:
```
node_modules/
.env
```

2. Update `backend/package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0) for Railway access
5. Get connection string

### Step 3: Deploy to Railway

1. Install Railway CLI or use web interface
2. Create new project
3. Add environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_string
   ADMIN_EMAIL=rudransh.sharma.292006@gmail.com
   ADMIN_PASSWORD=your_secure_password
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   FRONTEND_URL=your_frontend_url_after_deployment
   NODE_ENV=production
   ```
4. Deploy backend folder
5. Note your backend URL (e.g., `https://your-app.railway.app`)

## Option 2: Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. Add environment variables (same as above)
6. Deploy

## Deploy Frontend to Vercel

### Step 1: Update API URL

1. Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url/api
```

### Step 2: Build Production Version

```bash
cd frontend
npm run build
```

### Step 3: Deploy to Vercel

**Using Vercel CLI:**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**Using Vercel Website:**
1. Go to [Vercel](https://vercel.com)
2. Import your repository
3. Set:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variable:
   - `REACT_APP_API_URL` = your backend URL
5. Deploy

## Deploy Frontend to Netlify

1. Go to [Netlify](https://netlify.com)
2. Drag and drop `frontend/build` folder
3. Or connect repository and set:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. Add environment variable in Site settings

## Post-Deployment Steps

### 1. Update Backend CORS

Update `backend/server.js` CORS configuration:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

### 2. Update Frontend URLs

Ensure `REACT_APP_API_URL` points to your backend URL.

### 3. Test Everything

- [ ] Website loads correctly
- [ ] All sections display properly
- [ ] Blog posts are visible
- [ ] Admin login works
- [ ] Can create/edit/delete blog posts
- [ ] Contact form works
- [ ] Email notifications arrive

### 4. Security Checklist

- [ ] Changed default admin password
- [ ] Using strong JWT secret
- [ ] MongoDB user has strong password
- [ ] Environment variables are secure
- [ ] CORS is properly configured
- [ ] HTTPS is enabled

## Alternative: Deploy Both on Same Server

If using VPS or dedicated server:

### 1. Setup Server

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow MongoDB installation for your OS

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get install nginx
```

### 2. Clone and Setup

```bash
cd /var/www
git clone your-repo
cd webapp

# Install dependencies
cd backend && npm install
cd ../frontend && npm install && npm run build
```

### 3. Configure PM2

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'portfolio-backend',
    cwd: './backend',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Configure Nginx

Create `/etc/nginx/sites-available/portfolio`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/webapp/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify environment variables
- Check logs: `pm2 logs` or hosting platform logs

### Frontend shows 404 for API calls
- Verify `REACT_APP_API_URL` is correct
- Check CORS configuration
- Ensure backend is running

### Admin login fails
- Check JWT_SECRET is set
- Verify admin credentials
- Check browser console for errors

## Monitoring

- Backend: Use PM2 monitoring or hosting platform dashboard
- Frontend: Use Vercel/Netlify analytics
- Database: MongoDB Atlas monitoring
- Errors: Setup error tracking (Sentry, LogRocket)

## Backup Strategy

1. **Database**: Enable automated backups in MongoDB Atlas
2. **Code**: Keep repository up to date on GitHub
3. **Environment Variables**: Store securely (1Password, etc.)

## Updating After Deployment

```bash
# Pull latest changes
git pull origin main

# Update backend
cd backend
npm install
pm2 restart portfolio-backend

# Update frontend
cd ../frontend
npm install
npm run build

# If using separate hosting, redeploy through their platform
```

---

Need help? Contact: rudransh.sharma.292006@gmail.com
