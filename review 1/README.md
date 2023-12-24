# wsd-project II

## Description of the app

This is app allows creating and answering questions created by logged in users.
This app is done following the guideline from the project-handout: https://wsd.cs.aalto.fi/26-course-project-ii/1-project-handout/

I also added few extra features:
-logout
-cannot register with duplicate email
-removed staticMiddleware from app


## Running the app

The app can be run online or locally

### Online location of the app
App can be tested at online from the following link: https://deno-questionapp.herokuapp.com/


### Running locally

#### First create database & database schemas 
For the project, use the following database schema:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

#### Configuration
Add your db configuration as usually straight to database/database.js 

### Running app
Run from root folder:
deno run --allow-all --unstable run-locally.js

## Testing app
I have created 12 tests which can be run from the root folder with the following command:
deno test --allow-all --unstable

Two tests require some database information to work:
In the file located at .tests/routes/apis/questionApi_test.js 
the second test currently uses .send('{"questionId":"19", "optionId":"54"}')
You just need to set questionId & optionId to correct answer option from YOUR db so that this test works as expected.

In the file located at ./tests/routes/controllers/loginController_test.js
The first test expects that email = test@mail.com and password = test can be found from db.

Second test expects that email = null@mail.com and password = null cannot be found from db.