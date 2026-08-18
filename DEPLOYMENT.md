# Deployment Guide: Subscription Manager

This guide explains how to deploy the Subscription Manager application to Vercel (frontend) and Render (backend).

## Prerequisites

1. GitHub account with the project repository
2. Vercel account (free tier available at vercel.com)
3. Render account (free tier available at render.com)

## Backend Deployment on Render

### Step 1: Push to GitHub

```bash
cd "C:\Users\Athul VR\OneDrive\Desktop\subscription manager"
git init
git add .
git commit -m "Initial commit: Subscription Manager"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/subscription-manager.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up/log in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `subscription-manager` repository
5. Configure the deployment:
   - **Name**: `subscription-manager-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn config.wsgi`
   - **Root Directory**: `backend`

6. Add environment variables:
   - `DEBUG`: `False`
   - `SECRET_KEY`: Generate a strong key (Render can auto-generate)
   - `ALLOWED_HOSTS`: `subscription-manager-api.onrender.com,localhost`
   - `CORS_ALLOWED_ORIGINS`: `https://subscription-manager.vercel.app,http://localhost:3000`

7. Click "Create Web Service" and wait for deployment

**Note**: Save the deployed URL (e.g., `https://subscription-manager-api.onrender.com`)

### Step 3: Verify Backend Deployment

Once deployed, test the API:
```bash
curl https://subscription-manager-api.onrender.com/api/token/
```

You should get a 405 error (Method not allowed for GET), which is expected.

## Frontend Deployment on Vercel

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `subscription-manager` repository

### Step 2: Configure Build Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Select `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Add Environment Variables

In the "Environment Variables" section, add:
- **Name**: `VITE_API_BASE_URL`
- **Value**: `https://subscription-manager-api.onrender.com/api` (use your actual Render URL)

### Step 4: Deploy

Click "Deploy" and wait for the deployment to complete.

**Note**: Save the deployed URL (e.g., `https://subscription-manager.vercel.app`)

## Post-Deployment Configuration

### Update Backend CORS Settings

After the frontend is deployed, update the Render environment variable:

1. Go to your Render service dashboard
2. Go to "Environment" section
3. Update `CORS_ALLOWED_ORIGINS` to include the Vercel URL:
   ```
   https://subscription-manager.vercel.app,http://localhost:3000
   ```

4. Click "Save Changes" to redeploy

## Testing the Deployed Application

1. Open your Vercel URL in a browser
2. Register a new account
3. Log in with your credentials
4. Add some subscriptions
5. Verify all functionality works end-to-end

## Troubleshooting

### CORS Errors
- Check that the frontend URL is in the backend's `CORS_ALLOWED_ORIGINS`
- Verify the `VITE_API_BASE_URL` in the Vercel environment matches the Render backend URL

### 404 Errors on Frontend Routes
- Ensure Vercel's build output is set to `dist`
- Check that the React Router is configured correctly

### Database Issues
- Render free tier uses SQLite which resets on redeploys
- Consider upgrading to Render's PostgreSQL for persistence
- Or use an external PostgreSQL service (e.g., AWS RDS, Neon)

### Static Files Not Loading
- WhiteNoise middleware is configured for serving static files
- Ensure `DEBUG = False` in production

## Upgrading to Persistent Database

For production use, replace SQLite with PostgreSQL:

### 1. Add psycopg2 to requirements.txt
```
psycopg2-binary==2.9.9
```

### 2. Update settings.py

Add at the top with other imports:
```python
import dj_database_url
```

Replace the DATABASES section:
```python
if os.environ.get('DATABASE_URL'):
    DATABASES = {
        'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
```

### 3. On Render, Add PostgreSQL

1. Go to Render dashboard
2. Create a new "PostgreSQL" service
3. Copy the database URL
4. Add `DATABASE_URL` environment variable to your web service with the PostgreSQL connection string

## Useful Commands

### Local development
```bash
# Backend
cd backend
python manage.py runserver 8000

# Frontend (new terminal)
cd frontend
npm run dev
```

### Production build
```bash
# Frontend
cd frontend
npm run build
```

### View Render logs
```bash
# Automatically streams logs from the Render dashboard
```

### View Vercel logs
```bash
# Check the "Deployments" tab in Vercel dashboard
```

## Security Notes

- Always set `DEBUG = False` in production
- Generate a strong `SECRET_KEY`
- Use HTTPS (Vercel and Render provide this automatically)
- Keep sensitive information in environment variables
- Never commit `.env` files
- Regularly update dependencies

## Support

For issues with:
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Django**: https://docs.djangoproject.com
- **React**: https://react.dev
