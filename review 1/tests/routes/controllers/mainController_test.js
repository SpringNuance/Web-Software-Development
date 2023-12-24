import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";

Deno.test({
    name: "GET request to / should return status 200",
    fn: async () => {
      const testClient = await superoak(app);
      await testClient.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
