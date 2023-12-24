import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


Deno.test({
  name: "GET request to /api/questions/random returns random question as JSON document",
  fn: async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random")
        .expect(200)
        .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//You need to set questionId & optionId to correct answer from YOUR db so that this test works
Deno.test({
    name: "POST request to /api/questions/answer '{questionId=19, optionId: 54}'should return {correct: true}",
    fn: async () => {
      const testClient = await superoak(app);
      const response = await testClient.post("/api/questions/answer")
        .send('{"questionId":"19", "optionId":"54"}')
        .expect("Content-Type", new RegExp("application/json"))
        .expect({correct: true})
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to /api/questions/answer '{questionId=16}'should return {correct: false}",
    fn: async () => {
      const testClient = await superoak(app);
      const response = await testClient.post("/api/questions/answer")
        .send('{"questionId":"16"}')
        .expect("Content-Type", new RegExp("application/json"))
        .expect({correct: false})
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

