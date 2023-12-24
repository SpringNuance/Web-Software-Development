import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


// Test GET request to path /statistics
Deno.test({
    name: "GET /statistics",
    fn: () => {
        Deno.test("GET request to /statistics status should be 200", async () => {
            const testClient = await superoak(app);
            await testClient.get("/statistics")
              .expect(200);
          });
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
