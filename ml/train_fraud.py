import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


# Load dataset
df = pd.read_csv("datasets/fraud.csv")

print("Dataset:")
print(df.head())


# Features and target
X = df.drop(["transaction_id", "is_fraud"], axis=1)
y = df["is_fraud"]


# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# Train model
model.fit(X_train, y_train)


# Prediction
y_pred = model.predict(X_test)


# Evaluation
print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# Save model
joblib.dump(model, "models/fraud_model.pkl")

print("\nModel saved successfully!")