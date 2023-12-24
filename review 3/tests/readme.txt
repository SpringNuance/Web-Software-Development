Directory 'tests' includes ten automatic tests for the question application. 
Tests ensure that application doesn't broke but acts as expected when making requests to differenct paths.
These tests doesn't cover every path that can be requested or every method that can be requested to certain path,
but there are required ten tests, that test differenct combination of requested methods and paths.

Following paths and request methods are tested for expected output:

1. GET request to path /api/question/random
2. POST request to path /api/question/answer, data sent with test is random, and therefore there are two possible output
3. GET request to path /auth/register
4. POST request to path /auth/register, data sent with test is invalid
5. POST request to path /auth/register, data sent with test is valid
6. GET request to path /quiz
7. GET request to path /statistics
8. GET request to path /questions
9. POST request to path /questions, data sent with test is invalid
10. POST request to path /questions, data sent with test is valid


In order to run automatic tests, you have to set database credentials to file database/database.js.
You can run all the automatic test in root of project folder with following command:
deno test --allow-net --unstable --allow-read
