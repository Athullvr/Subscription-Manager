# Quick Deployment Guide

## 1. Prepare Your GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/subscription-manager.git
git push -u origin main
```

## 2. Deploy Backend on Render

1. Visit **render.com** → Sign in/up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Set **Root Directory** to `backend`
5. Add these **Environment Variables**:
   - `DEBUG`: `False`
   - `SECRET_KEY`: `(Let Render auto-generate)`
   - `ALLOWED_HOSTS`: `subscription-manager-api.onrender.com`
   - `CORS_ALLOWED_ORIGINS`: `http://localhost:3000`

6. Deploy and copy the URL (e.g., `https://subscription-manager-api.onrender.com`)

## 3. Deploy Frontend on Vercel

1. Visit **vercel.com** → Sign in/up
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Set **Root Directory** to `frontend`
5. Add **Environment Variable**:
   - `VITE_API_BASE_URL`: `https://subscription-manager-api.onrender.com/api`

6. Deploy and copy the URL (e.g., `https://subscription-manager.vercel.app`)

## 4. Update Backend CORS

After frontend is deployed:

1. Go to Render dashboard → your API service
2. Edit **Environment Variables**
3. Update `CORS_ALLOWED_ORIGINS`: `https://subscription-manager.vercel.app`
4. Save and redeploy

## Done! 🚀

Your app is now live:
- **Frontend**: https://subscription-manager.vercel.app
- **Backend**: https://subscription-manager-api.onrender.com

For detailed instructions, see **DEPLOYMENT.md**

---

## Quick Local Testing

```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python manage.py runserver 8000

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 to test locally.
