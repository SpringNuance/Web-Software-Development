import { bcrypt, validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const getRegistrationData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        email: params.get("email"),
        password: params.get("password"),
    }
};

const registerUser = async ({ request, response, render }) => {
  const registrationData = await getRegistrationData(request);
  const [passes, errors] = await validasaur.validate(registrationData, registrationValidationRules);
  if (!passes) {
    console.log(errors);
    registrationData.validationErrors = errors;
    render("registration.eta", registrationData);
  } else {
    await userService.addUser(registrationData.email, await bcrypt.hash(registrationData.password));
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };