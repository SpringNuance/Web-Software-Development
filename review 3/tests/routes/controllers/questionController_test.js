import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


// Test GET request to path /questions
  Deno.test({
    name: "GET /questions",
    fn: () => {
        Deno.test("GET request to /questions status should be 200", async () => {
            const testClient = await superoak(app);
            await testClient.get("/")
              .expect(200);
          });
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });



  // Test POST request to path /questions
  Deno.test({
    name: "POST /questions, invalid data",
    fn: () => {
        Deno.test("POST to /questions with invalid data return status should be 200", async () => {
            const testClient = await superoak(app);
            await testClient.post("/questions")
              .set("Session", "user={id:-1}")
              .send("title=,questions_text")
              .expect(200);
          });
    
     },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "POST /questions, valid data",
    fn: () => {
        Deno.test("POST to /questions with valid data return status should be 301", async () => {
            const testClient = await superoak(app);
            await testClient.post("/questions")
              .set("Session", "user={id:-1}")
              .send("title=JavaSript,questions_text=Is Javascript fun?")
              .expect(301);
          });
    
     },
    sanitizeResources: false,
    sanitizeOps: false,
  });


