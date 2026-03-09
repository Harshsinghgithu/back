import pandas as pd


def score_transactions(df: pd.DataFrame) -> pd.Series:
    """Generate a risk score between 0 and 1 for each row.

    - uses 'z_score' and 'iso_score' columns if available
    - normalizes z_score by clipping to [-5,5] and scaling to [0,1]
    - transforms iso_score (decision function) to [0,1] where lower values -> more anomalous
    - final score is average of both components (can be weighted later)
    """
    df = df.copy()

    # ensure necessary columns exist
    if "z_score" not in df.columns or "iso_score" not in df.columns:
        raise ValueError("DataFrame must contain 'z_score' and 'iso_score' for risk scoring")

    # component from z_score: take absolute value and clip
    z = df["z_score"].abs()
    z_norm = (z.clip(upper=5) / 5.0)  # values >5 are treated as 1.0 risk

    # component from iso_score: decision_function gives higher = normal, so invert
    iso = df["iso_score"]
    # we assume typical iso_score is roughly in [-0.5, 0.5]; scale accordingly
    if iso.max() != iso.min():
        iso_norm = 1 - (iso - iso.min()) / (iso.max() - iso.min())
    else:
        # All iso_scores are identical - assign neutral risk
        iso_norm = pd.Series(0.5, index=iso.index)
    
    # Handle any NaN values that might exist (from division or other operations)
    iso_norm = iso_norm.fillna(0.5)
    z_norm = z_norm.fillna(0.0)
    
    risk = (z_norm + iso_norm) / 2.0
    # ensure between 0 and 1 and no NaN values
    risk = risk.clip(0, 1).fillna(0.5)
    df["risk_score"] = risk
    return df["risk_score"]
