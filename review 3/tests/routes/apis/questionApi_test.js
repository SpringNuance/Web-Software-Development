import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


// Test GET request to path /api/questions/random returns json object
  Deno.test({
    name: "GET /api/questions/random",
    fn: () => {
      "GET request to /api/questions/random should return json object", async () => {
      const testClient = await superoak(app);
      await testClient.get("/api/questions/random")
        .expect(200)
        .expect("Content-Type", new RegExp("application/json"));
    }},
    sanitizeResources: false,
    sanitizeOps: false,
  });



// Test POST request to path /api/questions/anwer
  Deno.test({
    name: "POST /api/questions/answer",
    fn: () => {
      Deno.test("POST to /api/questions/answer with json object with random id values returns the json object, with attribute correct.", async () => {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
          .send({ questionsId: `${Math.floor(25 * Math.random())}`, optionId: `${Math.floor(25 * Math.random())}` })
          .expect({ correct: "false" } || {correct: "true"});
      });
     },
    sanitizeResources: false,
    sanitizeOps: false,
  });


/*
  Deno.test({
    name: "my test",
    fn: () => {... test code ... },
    sanitizeResources: false,
    sanitizeOps: false,
  });
*/