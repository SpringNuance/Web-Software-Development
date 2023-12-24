import { app } from "../../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";
import { assertMatch } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test({
    name: "GET request to '/auth/register' shows a form with password and email fields.", 
    fn: async () => {
        const testClient = await superoak(app);
        const res = await testClient.get("/auth/register").expect(200);
        const htmlText = res.text;
        assertMatch(htmlText, new RegExp("<input.*?name=\"password\".*?>"));
        assertMatch(htmlText, new RegExp("<input.*?name=\"email\".*?>")); },
    sanitizeResources: false,
    sanitizeOps: false,
});