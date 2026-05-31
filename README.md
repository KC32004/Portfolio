# Personal Portfolio — K Chandana

Live at **[k-chandana.vercel.app](https://k-chandana.vercel.app)**

Personal portfolio site with animated sections, dark/light mode, 
project showcase, and a working contact form backed by a Node.js API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 · Vite · Tailwind CSS · Framer Motion |
| Backend | Node.js · Express.js |
| Database | MongoDB Atlas |
| Auth | JWT · bcryptjs |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend) · Render (backend) |

---

## Features

- Animated hero with typing effect and scroll-reveal transitions
- Dark / light mode toggle
- Project showcase with search and category filter
- Working contact form — submissions stored in MongoDB, 
  email notification sent on every message
- JWT-protected admin dashboard to view, filter, and manage messages
- Fully responsive across mobile, tablet, and desktop
- Rate limiting and Helmet security headers

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Gmail account with App Password enabled

### Install & Run

```bash
# Backend
cd backend
cp .env.example .env    # fill in your values
npm install
npm run dev             # runs on :5000

# Frontend (new terminal)
cd frontend
cp .env.example .env    # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev             # runs on :5173
```

### Environment Variables

See `.env.example` in both `/frontend` and `/backend` for all required variables.  
Backend needs: `MONGO_URI`, `JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, `FRONTEND_URL`  
Frontend needs: `VITE_API_URL`

---

## Deployment

| Service | Directory | Notes |
|---|---|---|
| Vercel | `/frontend` | Set `VITE_API_URL` to your Render backend URL |
| Render | `/backend` | Add all backend env variables, start with `node server.js` |
| MongoDB Atlas | — | Allow `0.0.0.0/0` in Network Access for Render |

---

## Author

**K Chandana** — B.E. AI & Data Science, SDMIT (VTU, 2025)  
[Portfolio](https://k-chandana.vercel.app) · [LinkedIn](https://linkedin.com/in/k-chandana-ai) · [GitHub](https://github.com/KC32004)
