import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email_alert(receiver_email, risk_status):
    sender_email = "pandeyprachi264@gmail.com"
    app_password = "fxtzfyyqqywqxkkx"

    subject = "AI Risk Alert Notification"

    body = f"""
    Hello,

    AI Risk Intelligence System has detected a risk.

    Risk Level: {risk_status}

    Please check the dashboard for more details.

    Regards,
    AI Risk Intelligence System
    """

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(sender_email, app_password)

        server.sendmail(
            sender_email,
            receiver_email,
            message.as_string()
        )

        server.quit()

        print("Email alert sent successfully")

    except Exception as e:
        print("Email Error:", e)