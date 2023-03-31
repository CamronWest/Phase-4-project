from flask import Flask, render_template, url_for, redirect, request, flash, session, jsonify
from flask_login import LoginManager
from flask_migrate import Migrate
from models import User, Owner, Property, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_space.db'
app.config['SECRET_KEY'] = 'secret_key'

db.init_app(app)  # register the app with the SQLAlchemy instance
migrate = Migrate(app, db)  # initialize the Flask-Migrate extension

login_manager = LoginManager()
login_manager.init_app(app)

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

@app.route('/')
def home():
    return "Welcome to ROAM"
    # if 'username' in session:
    #     return 'Logged in as ' + session['username'] + '<br>' + \
    #         '<b><a href="/logout">Logout</a></b>'
    # return "You are not logged in <br><a href='/login'></b>" + \
    #     "click here to log in</b></a>"

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        return render_template('thank_you.html', username=username, email=email)
    else:
        return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        print(session['username'])
        return redirect('/home')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'message': 'User logged out successfully'})

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def create_fake_data(num_customers=10, num_properties_per_customer=2):
    fake = Faker()
    for _ in range(num_customers):
        # Create a fake owner
        fake_owner = Owner(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password(length=12)
        )
        db.session.add(fake_owner)
        db.session.commit()
    return jsonify(fake_owner.serialize()), 200

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
        user.username = request.json.get('username', user.username)
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
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    user = User(username=username, email=email, password=password)
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
        location = request.json.get('location')
        state = request.json.get('state')
        name = request.json.get('name')
        description = request.json.get('description')
        price = request.json.get('price')
        owner_id = request.json.get('owner_id')
        property = Property(name=name, location=location, state=state, description=description, price=price, owner_id=owner_id)
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
        property.location = request.get('location', property.location)
        property.state = request.get('state', property.state)
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