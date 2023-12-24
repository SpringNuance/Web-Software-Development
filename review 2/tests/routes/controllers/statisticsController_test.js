import { app } from "../../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test({
    name: "GET request to /statistics without authentication should return redirection to '/auth/login'", 
    fn: async () => {
        const testClient = await superoak(app);
        const res = await testClient.get("/statistics").expect(302);
        const headers = res.headers;
        assertEquals(headers.location, "/auth/login") },
    sanitizeResources: false,
    sanitizeOps: false,
});