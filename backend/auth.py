from fastapi import HTTPException, Depends
from fastapi.security import APIKeyHeader
import os

# API Key security
API_KEY = os.environ.get("API_KEY", "oHhGXPVm5rIljDywuhkywC6ICx1cTniydSvkJG8D99U")  # Default for development
api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key