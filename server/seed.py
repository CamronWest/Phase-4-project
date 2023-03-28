from faker import Faker
from app import db
from models import User, Owner, Property

def seed_data(num_users=10, num_properties_per_owner=2):
    fake = Faker()
    for _ in range(num_users):
        # Create a fake owner
        fake_owner = Owner(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password()
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating properties....")
   

    #     owners.user = rc(users)

    #     owners.append(recipe)

    # db.session.add_all(recipes)
    
    db.session.commit()
    print("Complete.")
