ROAM:

Introduction

Our  ROAM is a website service that allows users to book entertainment venues and bands. The website provides an easy-to-use platform for event organizers to book the perfect entertainment for their events, and for venue owners and bands to showcase their services and connect with potential clients. Our project uses a Flask API backend with a React frontend.

User Stories

Our MVP includes the following user stories:

As a user, I can sign up for an account
As a user, I can log in to the site and remain logged in
As a user, I can log out
As a user, I can view a list of all available venues in my area and their respective reviews
As a user, I can view a list of all available bands in my area and their respective reviewsAs a user, I can create a review for one specific venue or band
As a user, I can modify or delete a review that I left
As a user, I can create a new venue listing
As a user, I can create a new band listing
As a user, I can view venues on a map
As a user, I can search venues and bands based on their distance from my location
As a user, I can filter venues and bands based on their average rating

Installation and Setup

To install and run this project, follow these steps:

Clone the repository to your local machine
Install dependencies using npm install
Start the development server using npm start
Create a .env file in the root directory with the required environment variables
Additionally, to set up the database, run the following commands:


Install these Dependencies:

flask db init
flask db revision --autogenerate -m "whatever message"
flask db upgrade
Usage

To use this project, follow these steps:

Create an account or log in to an existing one
Browse available venues and bands in your area
Leave reviews for venues and bands you have worked with
Create new venue and band listings
Search for venues and bands based on distance or average rating
View venues on a map

Technologies Used

This project uses the following technologies:

Flask API
React
Formik
React Router
Contributors

Camron West - Full-stack Developer
Keino Chichester - Full-stack Developer
Forrest Jones - Full-stack Developer

Credits

This project was built using the following resources:

Tutorial on building a Flask API: https://www.tutorialspoint.com/flask/index.htm
React documentation: https://reactjs.org/docs/getting-started.html


