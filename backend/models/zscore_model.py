import numpy as np
import pandas as pd


def compute_zscore(df: pd.DataFrame, threshold: float = 3.0) -> pd.DataFrame:
    """Calculate Z-scores and flag anomalies on the 'amount' column.

    - mean and std are computed for the amount field
    - each row receives a z_score value
    - rows with |z_score| > threshold are marked with 'z_anomaly' boolean
    Returns a copy of the dataframe with two new columns.
    """
    # operate on copy to preserve original
    df = df.copy()
    if "amount" not in df.columns:
        raise ValueError("DataFrame must contain 'amount' column for z-score calculation")

    amounts = df["amount"].astype(float)
    mean = amounts.mean()
    std = amounts.std(ddof=0)
    if std == 0:
        # all amounts identical; no anomalies
        df["z_score"] = 0.0
        df["z_anomaly"] = False
        return df

    z_scores = (amounts - mean) / std
    df["z_score"] = z_scores
    df["z_anomaly"] = z_scores.abs() > threshold

    return df
