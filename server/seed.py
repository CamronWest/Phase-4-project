from faker import Faker
from app import db
from models import User, Owner, Property, db
from app import app

def seed_data(num_users=10, num_properties_per_owner=2):
    fake = Faker()
    for _ in range(num_users):
        # Create a fake owner
        fake_owner = Owner(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password()
        )
        db.session.add(fake_owner)
        db.session.commit()
        
        for _ in range(num_properties_per_owner):
            # Create a fake property
            fake_property = Property(
                name=fake.word(),
                location=fake.address(),
                price=fake.random_int(min=500, max=5000),
                description=fake.text(max_nb_chars=200)
            )
            fake_property.owners.append(fake_owner)
            db.session.add(fake_property)
            db.session.commit()
    print(f"Successfully seeded {num_users} users and {num_properties_per_owner} properties per user.")
