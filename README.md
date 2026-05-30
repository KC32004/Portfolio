# Chandana K — Portfolio Website

A premium, production-ready personal portfolio for an AI & Data Science Graduate. Built with React + Vite (frontend) and Node.js + Express + MongoDB Atlas (backend).

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
chandana-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer, ScrollUtils
│   │   │   ├── sections/   # Hero, About, Skills, Projects, etc.
│   │   │   └── ui/         # LoadingScreen, SectionWrapper
│   │   ├── context/        # ThemeContext
│   │   ├── data/           # portfolioData.js (all content)
│   │   ├── hooks/          # useScrollReveal
│   │   ├── pages/          # Home, AdminLogin, AdminDashboard, NotFound
│   │   └── services/       # api.js (axios instance)
│   └── package.json
└── backend/
    ├── config/             # db.js
    ├── controllers/        # contactController, authController
    ├── middleware/         # authMiddleware
    ├── models/             # Contact.js, Admin.js
    ├── routes/             # contactRoutes, authRoutes
    ├── utils/              # emailService.js
    └── server.js
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Gmail account with App Password enabled

### 1. Clone & Install

```bash
# Backend
cd backend
cp .env.example .env     # fill in your values
npm install
npm run dev              # runs on :5000

# Frontend (new terminal)
cd frontend
cp .env.example .env     # set VITE_API_URL
npm install
npm run dev              # runs on :5173
```

### 2. Environment Variables

**Backend `.env`:**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/chandana_portfolio
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d
ADMIN_EMAIL=kchandana.200432@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=kchandana.200432@gmail.com
SMTP_PASS=your_16_char_gmail_app_password
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Create Admin Account

```bash
# POST to /api/auth/register with your JWT_SECRET as secretKey
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"kchandana.200432@gmail.com","password":"Admin@2024","name":"K Chandana","secretKey":"your_jwt_secret"}'
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `frontend/` folder to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render

1. Push `backend/` folder to GitHub
2. Create **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add all environment variables from `.env`
7. Deploy

### MongoDB Atlas Setup

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Add IP `0.0.0.0/0` to Network Access (for Render)
3. Create DB user and copy connection string to `MONGO_URI`

---

## 🔐 Admin Dashboard

- URL: `/admin/login`
- Login with the credentials you registered above
- Features: View messages, search, filter, mark read/unread, delete, statistics

---

## 📄 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | — | Submit contact form |
| GET | `/api/contact` | ✅ JWT | Get all messages |
| GET | `/api/contact/:id` | ✅ JWT | Get single message |
| PATCH | `/api/contact/:id/read` | ✅ JWT | Toggle read status |
| DELETE | `/api/contact/:id` | ✅ JWT | Delete message |
| POST | `/api/auth/login` | — | Admin login |
| POST | `/api/auth/register` | — | Register admin (requires secret key) |
| GET | `/api/auth/me` | ✅ JWT | Get current admin |

---

## ✨ Features

- Animated hero with typing effect
- Scroll-reveal animations on all sections
- Dark/Light mode toggle
- Scroll progress indicator
- Project search + category filter
- Skill proficiency bars
- Working contact form → MongoDB
- Admin email notifications (Nodemailer)
- JWT-protected admin dashboard
- Rate limiting + Helmet security
- SEO meta tags + Open Graph
- Fully responsive (mobile/tablet/desktop)
- Loading screen
- Back to top button

---

## 📧 Gmail App Password Setup

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification (enable)
3. Security → App passwords
4. Generate password for "Mail" → "Other"
5. Copy the 16-char password to `SMTP_PASS`

---

Built with ❤️ by K Chandana
