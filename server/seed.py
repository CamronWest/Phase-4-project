from faker import Faker
from app import app, db
from models import User, Owner, Property

fake = Faker()

with app.app_context():
    # Create 10 fake users
    for i in range(10):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        user = User(username=username, email=email, password=password)
        db.session.add(user)

    # Create 5 fake owners
    for i in range(5):
        name = fake.name()
        email = fake.email()
        phone_number = fake.phone_number()
        user_id = fake.random_int(min=1, max=10) # Add this line to set user_id
        owner = Owner(name=name, email=email, phone_number=phone_number, user_id=user_id)
        db.session.add(owner)

    # Create 20 fake properties
    for i in range(20):
        name = fake.word()
        description = fake.text()
        price = fake.random_int(min=100, max=1000)
        owner_id = fake.random_int(min=1, max=5)
        property = Property(name=name, description=description, price=price, owner_id=owner_id)
        db.session.add(property)

    # Commit the changes to the database
    db.session.commit()
