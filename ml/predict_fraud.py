import joblib
import pandas as pd

import sys
sys.path.append(".")

from services.risk_analyzer import analyze_risk


# Load model
model = joblib.load("models/fraud_model.pkl")


# New transaction
data = {
    "amount": [40000],
    "transaction_hour": [2],
    "previous_transactions": [1],
    "location_change": [1]
}


df = pd.DataFrame(data)


# Prediction probability
probability = model.predict_proba(df)[0][1]


# Risk analysis
result = analyze_risk(probability)


print("\nAI Risk Analysis Report")
print("----------------------")

print("Risk Type: Financial Fraud")
print("Risk Score:", result["risk_score"], "%")
print("Severity:", result["severity"])
print("Recommendation:", result["recommendation"])