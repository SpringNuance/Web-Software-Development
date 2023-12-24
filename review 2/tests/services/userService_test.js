import { assertEquals, assertNotEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

Deno.test( {
    name: "Function addUser adds the user properly",
    fn: async () => {
        const pw =  await bcrypt.hash("tester");
        const test = await userService.addUser("tester@testing.com", pw);
        assertEquals(test, undefined);
    },
    sanitizeResources: false,
    sanitizeOps: false}
);

Deno.test("Function findUser doesn't return empty array", async () => {
    const user = await userService.findUserByEmail("tester@testing.com");
    assertNotEquals(user.length, 0);
});

Deno.test("Password 'tester' matches the one in the database", async () => {
    const userRows = await userService.findUserByEmail("tester@testing.com");
    const user = userRows[0];
    const passwordMatches = await bcrypt.compare("tester", user.password);
    assertEquals(passwordMatches, true);
});