
#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Recipe, db
from config import db

# db.create_all()
@app.before_first_request
def create_tables():
    db.create_all()


class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        image_url = request_json.get('image_url')
        bio = request_json.get('bio')

        user = User(
            username=username,
            image_url=image_url,
            bio=bio
        )

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')
            
            return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

class RecipeIndex(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return [recipe.to_dict() for recipe in user.recipes], 200
        
        return {'error': '401 Unauthorized'}, 401
        
    def post(self):

        if session.get('user_id'):

            request_json = request.get_json()

            title = request_json['title']
            instructions = request_json['instructions']
            minutes_to_complete = request_json['minutes_to_complete']

            try:

                recipe = Recipe(
                    title=title,
                    instructions=instructions,
                    minutes_to_complete=minutes_to_complete,
                    user_id=session['user_id'],
                )

                db.session.add(recipe)
                db.session.commit()

                return recipe.to_dict(), 201

            except IntegrityError:

                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(RecipeIndex, '/recipes', endpoint='recipes')


=======
from flask import Flask, render_template, url_for, redirect, request, flash
from extensions import db, login_manager
from faker import Faker
from models import User, Owner, Property  # Import User, Owner, and Property classes
from flask_migrate import Migrate
from flask_login.utils import login_required

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_space.db'
db.init_app(app)
login_manager.init_app(app)

# ...


# Your routes here

if __name__ == '__main__':
    app.run(debug=True)


# Define your routes here
    @app.route('/')
    def home():
    # Your home page logic
        return 'Welcome to the homepage!'


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    # Your signup logic
    pass

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Your login logic
    pass

@app.route('/logout')
@login_required
def logout():
    # Your logout logic
    pass

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
        
        for _ in range(num_properties_per_customer):
            # Create a fake property for the owner
            fake_property = Property(
                name=fake.company(),
                location=fake.address(),
                price=fake.random_int(min=500, max=5000),
                description=fake.text(max_nb_chars=200),
                owner_id=fake_owner.id
            )
            db.session.add(fake_property)
            db.session.commit()

#create_fake_data()
if __name__ == '__main__':
    app.run(debug=True)
