from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ARRAY
from sqlalchemy.sql import func

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(160), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=False)
    surname = db.Column(db.String(20), unique=False, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)


   

    def serialize(self):
        return {
            "id": self.id,
            "avatar": self.avatar,
            "name": self.name,
            "surname": self.surname,
            "username": self.username

        }
    
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image  = db.Column(db.String(160), unique=False, nullable=False)
    message = db.Column(db.String(500), unique=False, nullable=False)
    likes = db.Column(ARRAY(db.String), nullable=True)
    author = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    location = db.Column(db.String(30), unique=True, nullable=False)
    status = db.Column(db.String(50), unique=True, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "message": self.message,
            "likes": self.likes,
            "author": self.author,
            "created_at": self.created_at,
            "location": self.location,
            "status": self.status


        }



    def __repr__(self):
        return f'<User {self.name}>'