from flask import Flask, render_template, url_for, redirect, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from faker import Faker

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_space.db'
db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'

class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class Customer(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("user_role.id"), nullable=False)
    role = db.relationship("UserRole", backref="users")
    event_spaces = db.relationship("EventSpace", backref="owner", lazy=True)
    reviews = db.relationship("Review", backref="user", lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    user = db.relationship("Customer", backref="reviews")
    event_space_id = db.Column(db.Integer, db.ForeignKey("event_space.id"), nullable=False)
    event_space = db.relationship("EventSpace", backref="reviews")

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)

class EventSpace(Property):
    __tablename__ = "event_space"
    id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    reviews = db.relationship("Review", backref="event_space", lazy=True)

# Define your routes here
@app.route('/')
def home():
    # Your home page logic
    pass

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
    return Customer.query.get(int(user_id))

def create_fake_data(num_customers=10, num_properties_per_customer=2):
    fake = Faker()
    for _ in range(num_customers):
        # Create a fake customer
        fake_customer = Customer(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password(length=12)
        )
        db.session.add(fake_customer)
        db.session.commit()
        
        for _ in range(num_properties_per_customer):
            # Create a fake event space for the customer
            fake_event_space = EventSpace(
                name=fake.company(),
                location=fake.address(),
                price=fake.random_int(min=500, max=5000),
                description=fake.text(max_nb_chars=200),
                capacity=fake.random_int(min=10, max=500),
                amenities=fake.text(max_nb_chars=100),
                owner_id=fake_customer.id
            )
            db.session.add(fake_event_space)
            db.session.commit()

create_fake_data()
if __name__ == '__main__':
    app.run(debug=True)