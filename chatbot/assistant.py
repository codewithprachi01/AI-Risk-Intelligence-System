from groq import Groq


client = Groq(
    api_key="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"
)



def ask_bot(question, risk_data=None):

    try:

        context = ""

        if risk_data:

            context = f"""
            Current Risk Analysis Data:

            Risk Type:
            {risk_data.get('risk_type')}

            Risk Score:
            {risk_data.get('risk_score')}%

            Status:
            {risk_data.get('status')}

            Location:
            {risk_data.get('location')}

            Main Value:
            {risk_data.get('analysis',{}).get('main_value')}

            Previous Value:
            {risk_data.get('analysis',{}).get('previous_value')}

            Frequency:
            {risk_data.get('analysis',{}).get('frequency')}

            Additional Factor:
            {risk_data.get('analysis',{}).get('additional_factor')}
            """



        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content": """

You are an AI Risk Intelligence Assistant.

Your role:

1. Explain risk predictions clearly.
2. Analyze fraud, cyber, financial and business risks.
3. Explain why a risk score is high, medium or low.
4. Give practical recommendations.
5. Help users understand AI risk detection.

Always answer in a professional way.

When risk data is provided:
- Mention important factors.
- Explain possible causes.
- Suggest preventive actions.

"""
                },


                {
                    "role":"user",
                    "content": context + "\nUser Question:\n" + question
                }

            ]

        )


        return response.choices[0].message.content


    except Exception as e:

        return "Chatbot Error: " + str(e)