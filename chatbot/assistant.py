import os
from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_bot(question, risk_data=None):

    try:
        print("USER QUESTION:", question)

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        reply = response.choices[0].message.content

        print("GROQ RESPONSE:", reply)

        return reply

    except Exception as e:
        print("GROQ ERROR:", e)
        return "Error: " + str(e)