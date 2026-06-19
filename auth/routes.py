from flask import Blueprint, request, jsonify

from database.db import db
from models.user import User

from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


auth = Blueprint("auth", __name__)

bcrypt = Bcrypt()


@auth.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]


    existing_user = User.query.filter_by(email=email).first()

    if existing_user:

        return jsonify({
            "message":"User already exists"
        }),400



    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")


    user = User(
        name=name,
        email=email,
        password=hashed_password
    )


    db.session.add(user)
    db.session.commit()


    return jsonify({
        "message":"Registration successful"
    }),201




@auth.route("/login", methods=["POST"])
def login():

    data=request.json


    user = User.query.filter_by(
        email=data["email"]
    ).first()


    if not user:

        return jsonify({
            "message":"Invalid email"
        }),401



    if not bcrypt.check_password_hash(
        user.password,
        data["password"]
    ):

        return jsonify({
            "message":"Invalid password"
        }),401



    token = create_access_token(
        identity=user.id
    )


    return jsonify({

        "message":"Login successful",
        "token":token

    })