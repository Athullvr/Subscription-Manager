# Deployment Configuration Files

## Backend (Django) Files

### `backend/Procfile`
Specifies how Render should start the application using Gunicorn.
```
web: gunicorn config.wsgi --log-file -
```

### `backend/render.yaml`
Render's infrastructure-as-code configuration. Defines:
- Service type (Python web service)
- Region (Oregon)
- Build commands (installs dependencies, runs migrations)
- Start command (Gunicorn)
- Environment variables

### `backend/runtime.txt`
Specifies Python version for Render:
```
python-3.12.0
```

### `requirements.txt`
Python dependencies including:
- Django 6.0.6
- Django REST Framework
- djangorestframework-simplejwt (JWT auth)
- django-cors-headers (CORS support)
- gunicorn (production WSGI server)
- whitenoise (static file serving)

### `backend/config/settings.py` (updated)
Production-ready settings with:
- Environment variable support for SECRET_KEY, DEBUG, ALLOWED_HOSTS
- CORS configuration from environment
- WhiteNoise middleware for static files
- Support for dynamic CORS origins

## Frontend (React) Files

### `frontend/vercel.json`
Vercel's build configuration:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### `frontend/.env.example`
Template for environment variables:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### `frontend/package.json`
Contains React, Vite, axios, and react-router-dom dependencies.

### `frontend/src/api/axios.js` (updated)
Axios instance now uses `VITE_API_BASE_URL` environment variable for:
- Development: http://localhost:8000/api
- Production: (e.g., https://subscription-manager-api.onrender.com/api)

## Root Files

### `.gitignore`
Prevents committing:
- Python cache files (__pycache__, *.pyc)
- Virtual environments (venv, env)
- Django database (db.sqlite3)
- Node modules (node_modules/)
- Environment files (.env)
- IDE configurations

### `DEPLOYMENT.md`
Comprehensive deployment guide with:
- Step-by-step instructions for Render and Vercel
- Environment variable configuration
- Post-deployment configuration
- Troubleshooting guide
- Database upgrade instructions

### `DEPLOYMENT_QUICKSTART.md`
Quick reference for deploying both services.

## Environment Variables

### Backend (Render)

| Variable | Value | Notes |
|----------|-------|-------|
| `DEBUG` | `False` | Always False in production |
| `SECRET_KEY` | (auto-generated) | Render can generate this |
| `ALLOWED_HOSTS` | `subscription-manager-api.onrender.com` | Add more with commas |
| `CORS_ALLOWED_ORIGINS` | `https://subscription-manager.vercel.app` | Frontend URL |
| `DATABASE_URL` | (optional) | For PostgreSQL upgrade |

### Frontend (Vercel)

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_API_BASE_URL` | `https://subscription-manager-api.onrender.com/api` | Backend API URL |

## Deployment Flow

```
GitHub Repository
    ↓
Render (Backend)                    Vercel (Frontend)
    ↓                                    ↓
Django/DRF API         ←CORS→      React/Vite
Port 8000                           Port 3000/5173
(gunicorn)                          (npm run dev)
    ↓                                    ↓
SQLite (or PostgreSQL)          Served as static files
```

## Key Implementation Details

1. **JWT Authentication**: 
   - Tokens stored in localStorage
   - Automatic token refresh on 401
   - CSRF protection enabled

2. **CORS**: 
   - Configured per environment
   - Frontend and backend URLs must match
   - Credentials included in requests

3. **Static Files**:
   - WhiteNoise handles static file serving
   - Vite builds optimized production bundle

4. **Database**:
   - SQLite by default (suitable for development)
   - Easy upgrade to PostgreSQL for production

5. **Secrets Management**:
   - All sensitive data in environment variables
   - No secrets committed to Git
   - .gitignore prevents accidental commits

## Monitoring & Debugging

### Render Logs
```
Render Dashboard → Your Service → Logs
```

### Vercel Logs
```
Vercel Dashboard → Your Project → Deployments → Logs
```

### Local Testing
```bash
# Test API
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'

# Test Frontend
http://localhost:5173
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS errors | Update `CORS_ALLOWED_ORIGINS` in Render env vars |
| 404 on routes | Ensure Vercel build outputs to `dist` folder |
| Static files not loading | Check `DEBUG = False` and WhiteNoise middleware |
| Database reset on deploy | Upgrade to persistent database (PostgreSQL) |
| Slow first request | Render free tier may have cold starts |

## Next Steps

1. Push to GitHub
2. Follow DEPLOYMENT_QUICKSTART.md
3. Test all CRUD operations
4. Set up monitoring/alerts
5. Consider database upgrade for production
