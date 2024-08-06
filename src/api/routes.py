"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Likes
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
def login():
    
        username = request.json.get('username')
        password = request.json.get('password')


        if not username or not password:
            return jsonify({'error': 'username and password are required.'}), 400

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
                'msg': 'success'}), 200 
        


@api.route('/publish_post', methods=['POST'])
def publish_post():
    image = request.json.get('image', None)
    message = request.json.get('message', None)
    author = request.json.get('author', None)
    location = request.json.get('location', None)
    status = request.json.get('status', None)

    if not image or not message or not author or not location:
        return jsonify({"msg": "Missing post information"}), 400
    if len(message) > 200:
        return jsonify({"msg": "message length is too long"}), 400

    new_post = Post(
        image=image,
        message=message,
        author=author,
        location=location,
        status = status,
        
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify({
       "MSG": "post created!" }), 201


@api.route('/get_all_posts', methods=['GET'])
@jwt_required()
def get_all_posts():
    query = Post.query.order_by(Post.created_at.desc()).all()
    
    all_post = [{
        'id': post.id,
        'image': post.image,
        'message': post.message,
        'author': post.author,
        'created_at': post.created_at,
        "location": post.location,
        "status": post.status
        

    } for post in query]


    if len(all_post) == 0 :
        
        return jsonify({'msg': 'no post in db'}), 200
    
    return jsonify(all_post), 200

@api.route('/get_all_users', methods=['GET'])
@jwt_required()
def get_all_user():
    query = User.query.all()
    
    all_users = [{
        'id': user.id,
        'name': user.name,
        'surname': user.surname,
        'username': user.username,
        'avatar': user.avatar,
        

    } for user in query]


    if len(all_users) == 0 :
        
        return jsonify({'msg': 'no users in db'}), 200
    
    return jsonify(all_users), 200

@api.route('/like_post/<int:post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):
    
    user_validation = get_jwt_identity()
    user_from_db = User.query.filter_by(username = user_validation).first()
    like = Likes.query.filter_by(likes = user_from_db.username)

    if like:
        return jsonify({
            "msg": "this user already liked this post"
        }), 400 
    
    if not user_from_db:
        return jsonify({"msg": "User not found"}), 404

    post = Post.query.filter_by(id = post_id).first()
    
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    
    new_like = Likes(
        post_id = post_id,
        likes = user_from_db.username
    )
    db.session.add(new_like)

    
    #db.session.commit()

    return jsonify({
       "MSG": "Post liked",
       
       
    }), 201

@api.route('/get_by_id', methods=['GET'])
@jwt_required()
def get_by_id():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if not user_from_db:
        return jsonify({"msg": "this username not exist"})
    
    query = User.query.filter_by(id = user_from_db.id ).first()
    
    return jsonify(query.username), 200
