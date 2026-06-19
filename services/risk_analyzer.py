from services.risk_rules import RISK_TYPES, RISK_EXPLANATIONS



def analyze_risk(data):

    results = []

    selected_risk = data.get("risk_type")


    if selected_risk in RISK_TYPES:


        main_value = float(data.get("main_value", 0))

        previous_value = float(data.get("previous_value", 0))

        frequency = int(data.get("frequency", 0))

        factor = data.get(
            "additional_factor",
            ""
        ).lower()



        score = 20

        reasons = []



        # Value comparison

        if main_value > previous_value:

            score += 25

            reasons.append(
                "Current value is higher than previous value"
            )



        # Frequency analysis

        if frequency > 10:

            score += 25

            reasons.append(
                "High activity frequency detected"
            )



        # Additional factor

        if factor in [
            "suspicious",
            "high",
            "unknown"
        ]:

            score += 20

            reasons.append(
                "Suspicious additional factor detected"
            )



        # Risk type adjustment

        if selected_risk in [

            "Fraud Risk",

            "Cyber Security Risk",

            "Identity Theft Risk"

        ]:

            score += 10




        if score > 100:

            score = 100




        # Status (UPPERCASE FOR DATABASE)

        if score >= 70:

            status = "HIGH"


        elif score >= 40:

            status = "MEDIUM"


        else:

            status = "LOW"





        # AI Explanation

        explanation = RISK_EXPLANATIONS.get(

            selected_risk,

            "Risk analysis completed based on provided data."

        )





        # Recommendation

        if status == "HIGH":

            recommendation = (

                "Immediate investigation required."

            )


        elif status == "MEDIUM":

            recommendation = (

                "Monitor activity and verify details."

            )


        else:

            recommendation = (

                "Risk is low. Continue monitoring."

            )







        results.append({


            "risk_type": selected_risk,


            "score": score,


            "status": status,


            "reasons": reasons,


            "explanation": explanation,


            "recommendation": recommendation,


            "input_data": {


                "main_value": main_value,

                "previous_value": previous_value,

                "frequency": frequency,

                "additional_factor": factor

            }


        })





    print("RESULT:", results)


    return results