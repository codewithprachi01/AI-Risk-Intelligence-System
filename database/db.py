from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class RiskHistory(db.Model):

    __tablename__ = "risk_history"

    analysis_id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(db.Integer)

    risk_id = db.Column(db.Integer)

    input_data = db.Column(db.Text)

    risk_score = db.Column(db.Float)

    risk_level = db.Column(db.String(20))

    ai_explanation = db.Column(db.Text)

    recommendation = db.Column(db.Text)

    analysis_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


class Report(db.Model):

    __tablename__ = "reports"

    report_id = db.Column(
        db.Integer,
        primary_key=True
    )

    analysis_id = db.Column(
        db.Integer
    )

    report_file = db.Column(
        db.String(255)
    )

    generated_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )