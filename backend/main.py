from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import upload_api
import os
from auth import get_api_key

app = FastAPI(title="FraudGuard AI")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
        "https://luxury-pasca-537006.netlify.app",  # User's Netlify domain
        "https://astounding-crepe-1e6349.netlify.app",
        "https://fraudguard-ai.netlify.app",
        "*"  # Allow all origins for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_api.router)

# Global data storage (in production, use a database)
transactions_data = []
fraud_summary_data = {"total_transactions": 0, "fraud_cases": 0}

@app.get("/status")
def status():
    """Simple health check"""
    return {"status": "ok", "service": "FraudGuard AI"}

@app.get("/")
def read_root():
    return {"message": "Welcome to FraudGuard AI"}

@app.get("/transactions")
def get_transactions(api_key: str = Depends(get_api_key)):
    """Get stored transactions"""
    return {"transactions": transactions_data}

@app.get("/fraud-summary")
def get_fraud_summary(api_key: str = Depends(get_api_key)):
    """Get fraud summary"""
    return fraud_summary_data

if __name__ == "__main__":
    import os
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)