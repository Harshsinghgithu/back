from sklearn.ensemble import IsolationForest
import pandas as pd


def detect_anomalies(df: pd.DataFrame, contamination: float = 0.02) -> pd.DataFrame:
    """Fit IsolationForest on the 'amount' column and flag anomalies.

    - contamination defaults to 0.02
    - returns a copy of dataframe with 'iso_score' and 'iso_anomaly' columns
    """
    df = df.copy()
    if "amount" not in df.columns:
        raise ValueError("DataFrame must contain 'amount' column for IsolationForest")

    amounts = df[["amount"]].astype(float)
    model = IsolationForest(contamination=contamination, random_state=42)
    preds = model.fit_predict(amounts)
    # isolation forest outputs -1 for anomaly, 1 for normal
    df["iso_score"] = model.decision_function(amounts)
    df["iso_anomaly"] = preds == -1
    return df
