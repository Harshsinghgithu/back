from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
import pandas as pd
import io
import json

# Import fraud engine
from engine import fraud_engine
from auth import get_api_key

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/transaction")
async def upload_transaction(file: UploadFile = File(...), api_key: str = Depends(get_api_key)):
    """Endpoint to upload a transaction CSV for analysis"""

    # Check file type
    if file.content_type not in ("text/csv", "application/vnd.ms-excel"):
        raise HTTPException(
            status_code=415,
            detail="Only CSV files are supported"
        )

    # Read file
    contents = await file.read()

    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to parse CSV: {e}"
        )

    # Required columns
    required_cols = {"transaction_id", "amount", "customer_id", "timestamp"}

    if not required_cols.issubset(df.columns):
        missing = required_cols - set(df.columns)

        raise HTTPException(
            status_code=422,
            detail=f"Dataset missing required columns: {', '.join(missing)}",
        )
    
    # Convert numeric columns to proper types
    # This ensures amount, customer_id, transaction_id are numeric
    numeric_cols = {"amount", "customer_id", "transaction_id", "merchant_id"}
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Check for any conversion failures in critical 'amount' column
    if df["amount"].isna().sum() > 0:
        raise HTTPException(
            status_code=400,
            detail="Some values in 'amount' column could not be converted to numeric. Please check your CSV."
        )

    # Dataset statistics
    stats = json.loads(df.describe(include="all").to_json())

    # Run fraud detection engine
    detection = fraud_engine.analyze_transactions(df)

    # Final response
    response = {
        "stats": stats,
        "detection": detection
    }

    return JSONResponse(content=response)