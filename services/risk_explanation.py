def explain_risk(risk_type, score):

    explanation = {}

    if score >= 70:
        status = "High Risk"
        suggestion = "Immediate attention and detailed investigation required."

    elif score >= 40:
        status = "Medium Risk"
        suggestion = "Monitor the situation and take preventive actions."

    else:
        status = "Low Risk"
        suggestion = "Risk level is low. Continue regular monitoring."


    reasons = {

        "Fraud Risk":
            "Unusual transaction patterns or suspicious activities detected.",

        "Credit Risk":
            "Financial factors indicate possible repayment difficulties.",

        "Cyber Risk":
            "Security threats or unusual digital activities detected.",

        "Insurance Risk":
            "Claim patterns or user information indicate possible risk.",

        "Health Risk":
            "Health-related factors indicate increased probability.",

        "Business Risk":
            "Market or operational factors may affect business stability."
    }


    explanation["risk_type"] = risk_type
    explanation["score"] = score
    explanation["status"] = status
    explanation["reason"] = reasons.get(
        risk_type,
        "Risk factors identified based on provided information."
    )
    explanation["suggestion"] = suggestion


    return explanation