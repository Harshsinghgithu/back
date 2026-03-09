from models import zscore_model, isolation_forest
from engine import risk_scoring
import pandas as pd
import json
import numpy as np


def analyze_transactions(df: pd.DataFrame):

    # Copy dataframe
    df = df.copy()

    # ---------------------------------
    # 1. SELECT ONLY NUMERIC DATA
    # ---------------------------------
    numeric_df = df.select_dtypes(include=["number"])

    # ---------------------------------
    # 2. Z-SCORE DETECTION
    # ---------------------------------
    zscores = zscore_model.compute_zscore(numeric_df)

    z_anomalies = zscores["z_anomaly"]

    # ---------------------------------
    # 3. ISOLATION FOREST
    # ---------------------------------
    iso_df = isolation_forest.detect_anomalies(numeric_df)

    iso_anomalies = iso_df["iso_anomaly"]

    # ---------------------------------
    # 4. COMBINE RESULTS
    # ---------------------------------
    combined = z_anomalies | iso_anomalies

    # ---------------------------------
    # 5. ATTACH RESULTS
    # ---------------------------------
    df["z_score"] = zscores["z_score"]
    df["z_anomaly"] = zscores["z_anomaly"]

    df["iso_score"] = iso_df["iso_score"]
    df["iso_anomaly"] = iso_anomalies

    df["suspicious"] = combined

    # ---------------------------------
    # 6. RISK SCORING
    # ---------------------------------
    df["risk_score"] = risk_scoring.score_transactions(df)

    # ---------------------------------
    # 7. SUMMARY
    # ---------------------------------
    total_transactions = len(df)

    fraud_count = int(combined.sum())

    suspicious_idxs = df.index[combined].tolist()

    # ---------------------------------
    # 8. FINAL RESULT
    # ---------------------------------
    # Replace inf, -inf, and NaN with None to make JSON compliant
    df.replace([np.inf, -np.inf, np.nan], None, inplace=True)
    
    result = {
        "total_transactions": total_transactions,
        "fraud_detected_count": fraud_count,
        "suspicious_transactions": suspicious_idxs,
        "details": json.loads(df.loc[combined].to_json(orient="records")),
        "all_records": json.loads(df.to_json(orient="records")),
    }

    return result