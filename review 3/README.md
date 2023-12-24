RUN APPLICATION
There are two ways to use the application:
    1. Go to https://wsd-project2-question-app.herokuapp.com/
    2. Run application locally


Instructions to run application locally:

1.Change database credentials in file database/database.js
 Currently there is code:

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
}, CONCURRENT_CONNECTIONS);

Instead of that write the following code to file

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
   hostname: "hostname-possibly-at-elephantsql.com",
   database: "database-name",
   user: "database-name",
   password: "password",
   port: 5432,
}, CONCURRENT_CONNECTIONS);

Change values in hostname, database, user and password to working database credentials. Make sure that you also have created tables that are described in page https://wsd.cs.aalto.fi/26-course-project-ii/1-project-handout/ to your remote database.


After database credentials are set, you run application locally in root folder with following command:
deno run --unstable --allow-all --watch run-locally.js



AUTOMATIC TESTS:
When you have set database credentials, you can run automatic tests for application in root folder with following command:
deno test --allow-net --unstable --allow-read

For more specific information about tests read file tests/readme.txt



API
1.
You can make API requests for locally run application with following command:
curl http://localhost:7777/api/questions/random
OR
curl -X POST -d '{"questionId": "11", "optionId": 26}' http://localhost:7777/api/questions/answer
in the latter command, you can change values that are now set "11" and "26".

2l
You can make API requests for application deployd to Heroku with following command:
curl https://wsd-project2-question-app.herokuapp.com/api/questions/random
OR
curl -X POST -d '{"questionId": "11", "optionId": 26}' https://wsd-project2-question-app.herokuapp.com/api/questions/answer
in the latter command, you can change values that are now set "11" and "26".
