import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib


df = pd.read_csv("datasets/cyber.csv")

print(df.head())


X = df.drop("cyber_risk", axis=1)
y = df["cyber_risk"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)


model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


model.fit(X_train, y_train)


prediction = model.predict(X_test)


print("Accuracy:", accuracy_score(y_test, prediction))


joblib.dump(model, "models/cyber_model.pkl")


print("Cyber Model Saved Successfully!")