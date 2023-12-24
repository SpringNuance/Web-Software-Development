import { app } from "../../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";
import { assertNotEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test({
    name: "GET request to /api/questions/random should return a random question", 
    fn: async () => {
    const testClient = await superoak(app);
    const response = await testClient.get("/api/questions/random").expect("Content-Type", new RegExp("application/json"));
    const body = response.body;
    assertNotEquals(Object.keys(body).length, 0);
    },
    sanitizeResources: false,
    sanitizeOps: false}
);

Deno.test({
    name: "POST request to /api/questions/answer with invalid ID:s should return {correct:false}", 
    fn: async () => {
    const testClient = await superoak(app);
    const response = await testClient.post("/api/questions/answer")
        .send(JSON.parse('{ "questionId": 0, "optionId": 0}'))
        .expect("Content-Type", new RegExp("application/json"))
        .expect({ correct: false })
    },
    sanitizeResources: false,
    sanitizeOps: false}
);

