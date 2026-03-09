# FraudGuard AI

A full-stack fraud detection application with machine learning capabilities.

## Project Structure

```
fraudguard-ai/
├── backend/           # FastAPI backend
│   ├── main.py       # Main FastAPI application
│   ├── requirements.txt
│   ├── auth.py       # Authentication logic
│   ├── api/          # API endpoints
│   ├── engine/       # Fraud detection engine
│   └── models/       # ML models
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── netlify.toml  # Netlify deployment config
└── README.md
```

## Deployment

### Backend (Render)
- **URL**: https://back-3-tgqa.onrender.com
- **Framework**: FastAPI
- **Python**: 3.9+
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Netlify)
- **URL**: https://luxury-pasca-537006.netlify.app
- **Framework**: React + Vite
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /upload/transaction` - Upload CSV for fraud analysis
- `GET /transactions` - Get stored transactions
- `GET /fraud-summary` - Get fraud detection summary

## Environment Variables

### Backend
- `API_KEY` - API authentication key (default: development key)

### Frontend
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_API_KEY` - API authentication key