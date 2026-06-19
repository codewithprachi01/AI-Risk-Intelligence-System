from flask import Flask, render_template, request, jsonify, send_file
from services.risk_explanation import explain_risk
from database.db import db, RiskHistory, Report
from services.risk_analyzer import analyze_risk
from reports.generator import generate_pdf
from chatbot.assistant import ask_bot
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from auth.routes import auth
import requests


app = Flask(__name__)

CORS(app)



# =========================
# MYSQL CONFIGURATION
# =========================

app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://root:Prachi%402025@localhost/ai_risk_system'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
# =========================
# AUTH CONFIGURATION
# =========================

app.config["JWT_SECRET_KEY"] = "ai_risk_secret_key_2026"

jwt = JWTManager(app)

bcrypt = Bcrypt(app)


app.register_blueprint(auth)



with app.app_context():
    db.create_all()





# =========================
# HOME PAGE
# =========================

@app.route("/")
def home():

    return render_template("index.html")






# =========================
# CHATBOT
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    question = data.get("message")


    answer = ask_bot(question)


    return jsonify({

        "answer": answer

    })








# =========================
# DASHBOARD API FOR REACT
# =========================

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

        "Fraud Risk":0,
        "Credit Risk":0,
        "Market Risk":0,
        "Cyber Security Risk":0,
        "Transaction Risk":0,
        "Identity Theft Risk":0,
        "Loan Default Risk":0,
        "Insurance Claim Risk":0,
        "Money Laundering Risk":0,
        "Investment Risk":0,
        "Operational Risk":0,
        "Liquidity Risk":0,
        "Vendor Risk":0,
        "Compliance Risk":0,
        "Customer Churn Risk":0

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

    "reports":[

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


# =========================
# WEATHER API
# =========================

@app.route("/weather-data", methods=["GET"])
def weather_data():

    city = request.args.get("city","Lucknow")

    API_KEY = "566c7368806fce4ce47bddc526088fdc"


    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"


    response = requests.get(url)

    data = response.json()



    if data.get("cod") != 200:

        return jsonify({

            "error":"City not found"

        }),400



    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]



    # AI Heat Analysis


    if temperature >= 40:

        heat_level = "HIGH"

        warning = "Extreme heat detected. Heat stroke risk possible."

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

        "city":data["name"],

        "temperature":temperature,

        "humidity":humidity,

        "condition":data["weather"][0]["description"],

        "heat_level":heat_level,

        "warning":warning,

        "suggestions":suggestions

    })



# =========================
# REAL TIME NEWS INTELLIGENCE
# =========================

@app.route("/news-data")
def news_data():


    API_KEY = "da99a492a0784ae599bd8ea7f8bfa238"


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
                str(title)+
                str(description)
            ).lower()



            if "attack" in text or "hack" in text:

                risk="Cyber Security Risk"


            elif "fraud" in text or "scam" in text:

                risk="Fraud Risk"


            elif "market" in text or "stock" in text:

                risk="Market Risk"



            news_list.append({

                "title":title,

                "description":description,

                "source":
                article["source"]["name"],

                "risk":risk

            })



    return jsonify({

        "news":news_list

    })



# =========================
# DOWNLOAD PDF
# =========================

@app.route("/download")
def download():


    return send_file(

        "reports/Risk_Report.pdf",

        as_attachment=True

    )








# =========================
# PREDICT
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json


    results = analyze_risk(data)


    print("RESULT:", results)



    # Risk Explanation Generate

    explanations = []


    for risk in results:


      explanation = explain_risk(

        risk["risk_type"],

        risk["score"]

    )


    risk["explanation"] = explanation


    explanations.append(explanation)




    for risk in results:


        save_analysis(

    risk["risk_type"],

    {

        "risk_score": risk["score"],

        "severity": risk["status"],

        "recommendation":
        "Monitor and take preventive action",

        "explanation":
str(risk.get("explanation","AI detected risk pattern"))
    }

)





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
                r.get("explanation",
                "AI detected risk pattern")

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

# =========================
# UPLOAD CSV / EXCEL RISK ANALYSIS
# =========================

import pandas as pd


@app.route("/upload-risk", methods=["POST"])
def upload_risk():


    file = request.files.get("file")


    if not file:

        return jsonify({
            "error":"No file uploaded"
        }),400



    try:


        if file.filename.endswith(".csv"):

            df = pd.read_csv(file)


        elif file.filename.endswith(".xlsx") or file.filename.endswith(".xls"):

            df = pd.read_excel(file)


        else:

            return jsonify({

                "error":"Only CSV or Excel allowed"

            }),400




        all_results = []



        for index,row in df.iterrows():


            data = row.to_dict()


            result = analyze_risk(data)


            all_results.extend(result)



        return jsonify({

            "total_records":len(df),

            "results":all_results

        })



    except Exception as e:


        return jsonify({

            "error":str(e)

        }),500







# =========================
# SAVE MYSQL
# =========================

def save_analysis(risk_type, report):

    analysis = RiskHistory(

        input_data = risk_type,

        risk_score = report["risk_score"],

        risk_level = report["severity"].upper(),

        ai_explanation = str(
            report.get(
                "explanation",
                "AI detected risk pattern"
            )
        ),

        recommendation = str(
            report["recommendation"]
        )

    )


    db.session.add(analysis)

    db.session.commit()











# =========================
# RUN
# =========================

if __name__ == "__main__":


    app.run(

        debug=True

    )