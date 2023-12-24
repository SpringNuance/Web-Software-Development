import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";


// Test GET request to path /auth/register
Deno.test({
    name: "GET /auth/register",
    fn: () => {
        Deno.test("GET request to /auth/register status should be 200", async () => {
            const testClient = await superoak(app);
            await testClient.get("/auth/regsiter")
              .expect(200);
          });
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });



  // Test POST request to path /auth/register
  Deno.test({
    name: "POST /auth/register, invalid data",
    fn: () => {
        Deno.test("POST to /auth/register with invalid data return status should be 200", async () => {
            const testClient = await superoak(app);
            await testClient.post("/auth/register")
              .send("email=,password")
              .expect(200);
          });
    
     },
    sanitizeResources: false,
    sanitizeOps: false,
  });


  Deno.test({
    name: "POST /auth/register, valid data",
    fn: () => {
        Deno.test("POST to /auth/register with valid data return status should be 301", async () => {
            const testClient = await superoak(app);
            await testClient.post("/auth/register")
              .set("Session", "user={id:-1}")
              .send(`email=${Math.floor(10000 * Math.random())}@aalto.fi,password=12345`)
              .expect(301);
          });
    
     },
    sanitizeResources: false,
    sanitizeOps: false,
  });
