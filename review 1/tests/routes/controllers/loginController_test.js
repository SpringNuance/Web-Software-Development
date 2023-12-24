import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";

//test expects that email = test@mail.com and password = test can be found from db.
Deno.test({
    name: "LOGIN WORKS, POST to /auth/login should work with email = test@mail.com and password = test",
    fn: async () => {
      const testClient = await superoak(app);
      const response = await testClient.post("/auth/login")
        .send("email=test@mail.com&password=test")
        .expect(302)
        .expect("location", "/questions");

        //console.log(response);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

//test expects that email = null@mail.com and password = null cannot be found from db.
Deno.test({
    name: "LOGIN FAILS, POST to /auth/login should not work with email = null@mail.com and password = null",
    fn: async () => {
      const testClient = await superoak(app);
      const response = await testClient.post("/auth/login")
        .send("email=null@mail.com&password=null")
        .expect(302)
        .expect("location", "/auth/login")
        .expect("Redirecting to /auth/login.");

        //console.log(response);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});