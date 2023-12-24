import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { registrationValidation  } from "../../validation/validate.js";

const registerUser = async ({ render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;


  const registrationData = {
    email: params.get("email"), 
    password: params.get("password")
  };

    const res = await registrationValidation({email: registrationData.email, password: registrationData.password});
    const passes = res[0];
    const errors = res[1];

    if (!passes) {
      registrationData.validationErrors = errors;
      render("registration.eta", registrationData );
    }
    else {
      await userService.addUser(
        params.get("email"),
        await bcrypt.hash(params.get("password")),
      );
    
      response.redirect("/auth/login");

    }  

};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };