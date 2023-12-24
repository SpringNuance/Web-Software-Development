import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";

const loginValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required],
};

const getData = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    const data = {
        email: params.get("email"),
        password: params.get("password"),
    }
    return data;
}

const showLoginForm = ({ render }) => {
    render("login.eta");
};

const processLogin = async ({ request, response, state, render }) => {
    const data = await getData(request);
    const [passes, errors] = await validasaur.validate(
      data,
      loginValidationRules,
    );
    if (!passes) {
        data.validationErrors = errors;
        console.log(data);
        render("login.eta", data);
    } else {
        const userFromDatabase = await userService.findUserByEmail(data.email);
        if (!userFromDatabase.length>0) {
            response.redirect("/auth/login")
            return;
        }

        const user = userFromDatabase[0];
        const correctPassword = await bcrypt.compare(
            data.password,
            user.password,
        );
        if (!correctPassword) {
            response.redirect("/auth/login")
            return;
        }

        await state.session.set("user", user);
        response.redirect("/questions");
    }

};

export { showLoginForm, processLogin };