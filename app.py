from flask import Flask, request, jsonify, send_file

from services.risk_explanation import explain_risk
from database.db import db, RiskHistory, Report
from services.risk_analyzer import analyze_risk
from reports.generator import generate_pdf
from chatbot.assistant import ask_bot

from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from auth.routes import auth
from services.email_alert import send_email_alert

import requests
import os
import pandas as pd

from google.oauth2 import id_token
from google.auth.transport.requests import Request


app = Flask(__name__)

CORS(app)


# ============================================================
# DATABASE CONFIGURATION - RENDER POSTGRESQL
# ============================================================

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# ============================================================
# AUTH CONFIGURATION
# ============================================================

app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "ai_risk_secret_key_2026"
)

jwt = JWTManager(app)

bcrypt = Bcrypt(app)

app.register_blueprint(auth)


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

with app.app_context():
    db.create_all()


# ============================================================
# GOOGLE LOGIN
# ============================================================

@app.post("/google-login")
def google_login():

    try:

        data = request.json

        print("GOOGLE DATA RECEIVED:", data)

        token = data["token"]

        user_info = id_token.verify_oauth2_token(
            token,
            Request(),
            os.getenv(
                "GOOGLE_CLIENT_ID",
                "376747902629-5nf2fkl9p3im2hd6a6f9kekdll55o43c.apps.googleusercontent.com"
            ),
            clock_skew_in_seconds=30
        )

        email = user_info["email"]

        access_token = create_access_token(
            identity=email
        )

        return jsonify({
            "token": access_token,
            "email": email
        })

    except Exception as e:

        print("GOOGLE LOGIN ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 400


# ============================================================
# DASHBOARD API
# ============================================================

@app.route("/dashboard-data", methods=["GET"])
def dashboard_data():

    reports = RiskHistory.query.order_by(
        RiskHistory.analysis_date.desc()
    ).all()

    total = len(reports)

    high = 0
    medium = 0
    low = 0

    categories = {

        "Fraud Risk": 0,
        "Credit Risk": 0,
        "Market Risk": 0,
        "Cyber Security Risk": 0,
        "Transaction Risk": 0,
        "Identity Theft Risk": 0,
        "Loan Default Risk": 0,
        "Insurance Claim Risk": 0,
        "Money Laundering Risk": 0,
        "Investment Risk": 0,
        "Operational Risk": 0,
        "Liquidity Risk": 0,
        "Vendor Risk": 0,
        "Compliance Risk": 0,
        "Customer Churn Risk": 0

    }

    for r in reports:

        if r.risk_level == "HIGH":
            high += 1

        elif r.risk_level == "MEDIUM":
            medium += 1

        elif r.risk_level == "LOW":
            low += 1

        if r.input_data in categories:
            categories[r.input_data] += 1

    return jsonify({

        "total": total,

        "high": high,

        "medium": medium,

        "low": low,

        "categories": categories,

        "explanations": [

            {
                "risk_type": r.input_data,
                "score": r.risk_score,
                "status": r.risk_level,
                "reason": r.ai_explanation,
                "suggestion": r.recommendation
            }

            for r in reports[:10]

        ],

        "reports": [

            {
                "date": r.analysis_date.strftime("%d-%m-%Y"),

                "risk": r.input_data,

                "score": r.risk_score,

                "status": r.risk_level,

                "explanation": r.ai_explanation,

                "recommendation": r.recommendation

            }

            for r in reports

        ]

    })


# ============================================================
# WEATHER API
# ============================================================

@app.route("/weather-data", methods=["GET"])
def weather_data():

    city = request.args.get("city", "Lucknow")

    API_KEY = os.getenv("OPENWEATHER_API_KEY")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    data = response.json()

    if data.get("cod") != 200:

        return jsonify({
            "error": "City not found"
        }), 400

    temperature = data["main"]["temp"]

    humidity = data["main"]["humidity"]


    # ========================================================
    # HEAT RISK ANALYSIS
    # ========================================================

    if temperature >= 40:

        heat_level = "HIGH"

        warning = (
            "Extreme heat detected. "
            "Heat stroke risk possible."
        )

        suggestions = [

            "Drink enough water",

            "Avoid outdoor activity during afternoon",

            "Wear light clothes",

            "Stay in shaded areas"

        ]

    elif temperature >= 32:

        heat_level = "MEDIUM"

        warning = "High temperature detected."

        suggestions = [

            "Stay hydrated",

            "Avoid long exposure to sunlight",

            "Take regular breaks"

        ]

    else:

        heat_level = "LOW"

        warning = "Temperature is normal."

        suggestions = [

            "Normal outdoor activity is safe",

            "Maintain regular hydration"

        ]


    return jsonify({

        "city": data["name"],

        "temperature": temperature,

        "humidity": humidity,

        "condition": data["weather"][0]["description"],

        "heat_level": heat_level,

        "warning": warning,

        "suggestions": suggestions

    })


# ============================================================
# REAL TIME NEWS INTELLIGENCE
# ============================================================

@app.route("/news-data")
def news_data():

    API_KEY = os.getenv("NEWS_API_KEY")

    url = (
        "https://newsapi.org/v2/everything?"
        "q=fraud OR cyber OR finance OR market OR security"
        "&language=en"
        "&sortBy=publishedAt"
        f"&apiKey={API_KEY}"
    )

    response = requests.get(url)

    data = response.json()

    news_list = []

    if "articles" in data:

        for article in data["articles"][:10]:

            title = article.get("title")

            description = article.get(
                "description",
                "No description"
            )

            risk = "Normal"

            text = (
                str(title) +
                str(description)
            ).lower()

            if "attack" in text or "hack" in text:

                risk = "Cyber Security Risk"

            elif "fraud" in text or "scam" in text:

                risk = "Fraud Risk"

            elif "market" in text or "stock" in text:

                risk = "Market Risk"

            news_list.append({

                "title": title,

                "description": description,

                "source": article["source"]["name"],

                "risk": risk

            })

    return jsonify({

        "news": news_list

    })


# ============================================================
# DOWNLOAD PDF
# ============================================================

@app.route("/download")
def download():

    return send_file(

        "reports/Risk_Report.pdf",

        as_attachment=True

    )


# ============================================================
# PREDICT RISK
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    user_email = data.get("email")

    print("USER EMAIL:", user_email)

    results = analyze_risk(data)

    print("RESULT:", results)


    # ========================================================
    # RISK EXPLANATIONS
    # ========================================================

    explanations = []

    for risk in results:

        explanation = explain_risk(
            risk["risk_type"],
            risk["score"]
        )

        risk["explanation"] = explanation

        explanations.append(explanation)


    # ========================================================
    # SAVE RESULTS + EMAIL ALERT
    # ========================================================

    for risk in results:

        save_analysis(

            risk["risk_type"],

            {

                "risk_score": risk["score"],

                "severity": risk["status"],

                "recommendation":
                    "Monitor and take preventive action",

                "explanation":
                    str(
                        risk.get(
                            "explanation",
                            "AI detected risk pattern"
                        )
                    )

            }

        )


        # ====================================================
        # HIGH RISK EMAIL ALERT
        # ====================================================

        if risk["status"].upper() == "HIGH":

            print("HIGH RISK DETECTED")

            if user_email:

                print(
                    "Sending email to:",
                    user_email
                )

                send_email_alert(
                    user_email,
                    risk["status"]
                )


    # ========================================================
    # GENERATE PDF
    # ========================================================

    generate_pdf(

        {

            "total_risks": len(results),

            "results": [

                {

                    "risk_type": r["risk_type"],

                    "score": r["score"],

                    "status": r["status"],

                    "recommendation":
                        "Monitor and take preventive action",

                    "explanation":
                        r.get(
                            "explanation",
                            "AI detected risk pattern"
                        )

                }

                for r in results

            ]

        }

    )


    return jsonify({

        "risk_type":
            results[0]["risk_type"],

        "risk_score":
            results[0]["score"],

        "severity":
            results[0]["status"],

        "recommendation":
            "Monitor and take preventive action",

        "results":
            results,

        "explanations":
            explanations

    })


# ============================================================
# AI CHAT ASSISTANT
# ============================================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.json

        message = data.get("message")

        if not message:

            return jsonify({

                "reply": "Please enter a message"

            }), 400


        response = ask_bot(message)


        return jsonify({

            "reply": response

        })


    except Exception as e:

        print("CHAT ERROR:", e)

        return jsonify({

            "reply": "Unable to process your request"

        }), 500


# ============================================================
# UPLOAD CSV / EXCEL RISK ANALYSIS
# ============================================================

@app.route("/upload-risk", methods=["POST"])
def upload_risk():

    file = request.files.get("file")

    if not file:

        return jsonify({

            "error": "No file uploaded"

        }), 400


    try:

        if file.filename.endswith(".csv"):

            df = pd.read_csv(file)

        elif (
            file.filename.endswith(".xlsx")
            or file.filename.endswith(".xls")
        ):

            df = pd.read_excel(file)

        else:

            return jsonify({

                "error": "Only CSV or Excel allowed"

            }), 400


        all_results = []


        for index, row in df.iterrows():

            data = row.to_dict()

            result = analyze_risk(data)

            all_results.extend(result)


        return jsonify({

            "total_records": len(df),

            "results": all_results

        })


    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500


# ============================================================
# SAVE MYSQL/POSTGRES DATABASE
# ============================================================

def save_analysis(risk_type, report):

    analysis = RiskHistory(

        input_data=risk_type,

        risk_score=report["risk_score"],

        risk_level=report["severity"].upper(),

        ai_explanation=str(

            report.get(

                "explanation",

                "AI detected risk pattern"

            )

        ),

        recommendation=str(

            report["recommendation"]

        )

    )

    db.session.add(analysis)

    db.session.commit()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    port = int(
        os.getenv("PORT", 5000)
    )

    app.run(

        host="0.0.0.0",

        port=port,

        debug=False

    )