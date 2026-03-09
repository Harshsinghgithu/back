import pandas as pd
import numpy as np


def create_synthetic_transactions(n: int = 5000) -> pd.DataFrame:
    """Generate n synthetic transaction records with fraud flag."""
    np.random.seed(0)
    data = {
        "transaction_id": np.arange(1, n + 1),
        "user_id": np.random.randint(1, 300, size=n),
        "merchant_id": np.random.randint(1, 100, size=n),
        "amount": np.random.exponential(scale=50, size=n),
        "timestamp": pd.date_range("2021-01-01", periods=n, freq="min"),
        "location": np.random.choice(["NY", "CA", "TX", "WA", "FL"], size=n),
        "device": np.random.choice(["mobile", "desktop", "tablet"], size=n),
    }
    df = pd.DataFrame(data)
    # mark approximately 2% as fraud
    fraud_indices = np.random.choice(df.index, size=int(n * 0.02), replace=False)
    df["is_fraud"] = False
    df.loc[fraud_indices, "is_fraud"] = True

    # inflate amounts for fraud cases
    df.loc[fraud_indices, "amount"] *= 10
    return df


if __name__ == "__main__":
    df = create_synthetic_transactions(5000)
    df.to_csv("data/transactions.csv", index=False)
    print("Dataset generated to data/transactions.csv")