import { showLoginForm } from "../../routes/controllers/loginController.js";
import { showRegistrationForm } from "../../routes/controllers/registrationController.js";
import { assertEquals } from "../../deps.js";


let usedParameterValue = null;

const myRenderFunction = (fileName) => {
  usedParameterValue= fileName;
}

Deno.test("showLoginForm should render the correct file", async () => {
    usedParameterValue = null;
    const myContext = {
        render: myRenderFunction,
    };
    showLoginForm(myContext);
    assertEquals(usedParameterValue,"login.eta");
});

Deno.test("showRegistrationForm should render the correct file", async () => {
    usedParameterValue = null;
    const myContext = {
        render: myRenderFunction,
    };
    showRegistrationForm(myContext);
    assertEquals(usedParameterValue,"registration.eta");
});