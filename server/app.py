from flask import Flask, render_template, url_for, redirect, request, flash, Flask,session
from faker import Faker
from flask_restful import Resource
from flask_migrate import Migrate
from flask_login.utils import login_required
from config import app, db, api
from models import User, Owner, Property, db, login_manager


db.init_app(app)
login_manager.init_app(app)


if __name__ == '__main__':
    app.run(debug=True)



@app.route('/')
def home():
    if 'username' in session:
        return 'Logged in as ' + session['username'] + '<br>' + \
            '<b><a href="/logout">Logout</a></b>'
    return "You are not logged in <br><a href='/login'></b>" + \
        "click here to log in</b></a>"
    

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    user = User.query.all()
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        
        # Redirect to a thank you page if the signup is successful  
        return render_template('thank_you.html', name=name)
    else:
        # Display the signup form if the method request is just GET 
        return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect('/')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')

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
