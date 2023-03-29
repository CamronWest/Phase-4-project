from flask import Flask, jsonify, request
from models import User, Owner, Property, db
from flask_migrate import Migrate
from flask_login.utils import login_required
from flask_login import LoginManager


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_space.db'

db.init_app(app)  # register the app with the SQLAlchemy instance

migrate = Migrate(app, db)  # initialize the Flask-Migrate extension

# Owners routes
@app.route('/owners', methods=['GET'])
def get_owners():
    owners = Owner.query.all()
    owners_dict = [owner.serialize() for owner in owners]
    return jsonify(owners_dict), 200

@app.route('/owners/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def owner_detail(id):
    owner = Owner.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(owner.serialize()), 200
    elif request.method == 'PUT':
        # Update the owner's properties
        owner.name = request.json.get('name', owner.name)
        owner.email = request.json.get('email', owner.email)
        owner.phone_number = request.json.get('phone_number', owner.phone_number)
        db.session.commit()
        return jsonify(owner.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(owner)
        db.session.commit()
        return jsonify({}), 204

@app.route('/owners', methods=['POST'])
def create_owner():
    name = request.json.get('name')
    email = request.json.get('email')
    phone_number = request.json.get('phone_number')
    user_id = request.json.get('user_id')
    owner = Owner(name=name, email=email, phone_number=phone_number, user_id=user_id)
    db.session.add(owner)
    db.session.commit()
    return jsonify(owner.serialize()), 201

# Users routes
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_dict = [user.serialize() for user in users]
    return jsonify(users_dict), 200

@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user_detail(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(user.serialize()), 200
    elif request.method == 'PUT':
        # Update the user's properties
        user.name = request.json.get('name', user.name)
        user.email = request.json.get('email', user.email)
        user.password = request.json.get('password', user.password)
        db.session.commit()
        return jsonify(user.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({}), 204

@app.route('/users', methods=['POST'])
def create_user():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')
    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

# Properties routes
@app.route('/properties', methods=['GET', 'POST'])
def properties():
    if request.method == 'GET':
        properties = Property.query.all()
        properties_dict = [property.serialize() for property in properties]
        return jsonify(properties_dict), 200
    elif request.method == 'POST':
        name = request.json.get('name')
        description = request.json.get('description')
        price = request.json.get('price')
        owner_id = request.json.get('owner_id')
        property = Property(name=name, description=description, price=price, owner_id=owner_id)
        db.session.add(property)
        db.session.commit()
        return jsonify(property.serialize()), 201

@app.route('/properties/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def property_detail(id):
    property = Property.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(property.serialize()), 200
    elif request.method == 'PUT':
        # Update the property's properties
        property.name = request.json.get('name', property.name)
        property.description = request.json.get('description', property.description)
        property.price = request.json.get('price', property.price)
        db.session.commit()
        return jsonify(property.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(property)
        db.session.commit()
        return jsonify({}), 204

if __name__ == '__main__':
    app.run(debug=True)