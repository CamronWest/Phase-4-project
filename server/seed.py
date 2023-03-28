#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, users, owners

fake = Faker()

with app.app_context():

    print("Deleting all users...")
    users.query.delete()
    owners.query.delete()

    fake = Faker()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(20):
        
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
            bio=fake.paragraph(nb_sentences=3),
            image_url=fake.url(),
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating properties....")
   

        recipe.user = rc(users)

        recipes.append(recipe)

    db.session.add_all(recipes)
    
    db.session.commit()
    print("Complete.")