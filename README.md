# Subscription Manager

A full-stack Subscription Manager application with a Django backend and a React (Vite) frontend.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://subscription-manager-frontend-two.vercel.app](https://subscription-manager-frontend-two.vercel.app)
- **Backend API (Render)**: [https://subscription-manager-backend.onrender.com](https://subscription-manager-backend.onrender.com) *(Update with your actual Render URL)*

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, CSS (Glassmorphism & Rich Aesthetics)
- **Backend**: Django, Django REST Framework, JWT Authentication
- **Database**: SQLite (Local), PostgreSQL (Production)
- **Hosting**: Vercel (Frontend), Render (Backend)

## 📦 Project Structure

- `/frontend`: Vite + React frontend application.
- `/backend`: Django REST API backend.

## 🚀 Local Setup

### Backend
1. Navigate to `/backend`.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations & start server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## 🌐 Production Deployment Setup

### Backend (Render)
- **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
- **Start Command**: `gunicorn config.wsgi:application`

### Frontend (Vercel)
- Set **Root Directory** to `frontend`.
- Set Environment Variable `VITE_API_BASE_URL` to your backend URL (e.g. `https://your-backend.onrender.com/api`).
