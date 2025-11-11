# FullTask AI Tutor

A React + Node app that provides AI-powered tutoring in Biology, Chemistry and Nursing.

## Run locally

### Backend
cd backend
cp .env.example .env
# set OPENAI_API_KEY in .env
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Deploy
- Push to GitHub.
- Create two services on Render:
  - Web Service for backend (Node).
  - Static Site (or Web Service) for frontend (build with `npm run build` and publish `dist`).
- Add env vars in Render for OPENAI_API_KEY, AI_MODEL, etc.
