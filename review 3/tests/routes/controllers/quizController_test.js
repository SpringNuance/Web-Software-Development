import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


// Test GET request to path /quiz
Deno.test({
    name: "GET /quiz",
    fn: () => {
        Deno.test("GET request to /quiz status should be 301", async () => {
            const testClient = await superoak(app);
            await testClient.get("/quiz")
              .expect(301);
          });
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
