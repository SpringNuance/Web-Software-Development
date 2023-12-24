import { app } from "../../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";

Deno.test("GET request to / should return Basic information page", async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect(new RegExp("Multiple choice question app"));
});