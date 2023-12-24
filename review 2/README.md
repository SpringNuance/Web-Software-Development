# Documentation for the app

## Database information
You need to create these four tables for your own database:
```sql
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
```

## Running the app
You need to edit the database.js file in database folder, and add in your own credentials there.
After that you can run the app with the following command.
```shell
deno run --unstable --allow-all run-locally.js
```

## Running the tests
You can run the tests after your database credentials have been set (AND MAKE SURE YOU HAVE AT LEAST ONE QUESTION IN YOUR DATABASE) 
Then use the following command:
```shell
deno test --unstable --allow-all
```
Note that sometimes the tests may fail with 'AssertionError: Test case is leaking resources.'
Re-running the tests usually solves that, I'm not sure what is causing that error.

## Using the application at an online location:
You can access this application at the following link online:
https://wsd-multiple-choice-questions.herokuapp.com/ 

## Additional features in the application
I think that the application fulfills every requirement listed in the project handout. In addition I added in a log-out button to the navigation bar. 

## Other notes
I was trying to use milligram through CDN but couldn't figure out how to make the navigation bar horizontal and cool looking. 
So I ended up using PaperCSS like in the application example II...