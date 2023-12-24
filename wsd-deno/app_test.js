import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";
import { app } from "./app.js";

Deno.test("GET request to / should return 'Hello world!'", async () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect("Hello world!");
});