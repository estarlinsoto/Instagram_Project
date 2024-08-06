"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'password'  
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


@api.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    name = request.json.get('name', None)
    surname = request.json.get('surname', None)
    avatar = request.json.get('avatar', None)

    if not username or not password or not name or not surname or not avatar:
        return jsonify({"msg": "Missing user information"}), 400

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"msg": "Username already exists"}), 409

    raw_password = password
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        username=username,
        password=password_hash,
        name=name,
        surname=surname,
        avatar=avatar,
        
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)
    return jsonify({
       "access_token": access_token,
       "MSG": "user created!" }), 201

@api.route('/login', methods=['POST'])
def get_token():
    
        username = request.json.get('username')
        password = request.json.get('password')


        if not username or not password:
            return jsonify({'error': 'usernae and password are required.'}), 400

        username_from_db = User.query.filter_by(username= username).first()

        if not username_from_db:
            return jsonify({"msg": "username don't exist"}), 404

       
        password_from_db = username_from_db.password 
        password_verification = bcrypt.check_password_hash(password_from_db, password) 

        if not password_verification:
             return jsonify({"msg": "Incorrect password"}), 401
        
        else: 

            access_token = create_access_token(identity= username_from_db.id)
            return jsonify({
                'access_token': access_token,
                'msg': 'success'
                }), 200 