from flask import Flask, render_template, url_for, redirect, request, flash
from extensions import db, login_manager
from faker import Faker
from models import User, Owner, Property  # Import User, Owner, and Property classes
from flask_migrate import Migrate
from flask_login import login_required

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
