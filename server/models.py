from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Table, Column, Integer, ForeignKey
from flask_login import LoginManager
from config import db

login_manager = LoginManager()

# Define the association table
property_user_association_table = db.Table('property_user_association',
    db.Column('property_id', db.Integer, db.ForeignKey('property.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Define the many-to-many relationship with Property
    owned_properties = db.relationship('Property', secondary=property_user_association_table, back_populates='owners')

class Owner(User):
    __tablename__ = 'owner'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    owned_properties = db.relationship("Property", backref="owner", lazy=True)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    # Define the many-to-many relationship with User
    owners = db.relationship('User', secondary=property_user_association_table, back_populates='owned_properties')

    owner_id = db.Column(db.Integer, db.ForeignKey("owner.id"), nullable=False)
