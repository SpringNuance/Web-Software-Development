import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";


const registerValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
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

const registerUser = async ({ request, response, render }) => {
    const data = await getData(request);
    const [passes, errors] = await validasaur.validate(
        data,
        registerValidationRules,
    );
    if (!passes) {
        data.validationErrors = errors;
        render("registration.eta", data);
    } else {
        
        const userFromDatabase = await userService.findUserByEmail(data.email);
        if (userFromDatabase.length>0) {
            render("registration.eta", {validationErrors: [{err:"This email is already reserved"}]});
            return;
        }

        const hash = await bcrypt.hash(data.password);

        await userService.addUser(data.email, hash);
    
        response.redirect("/auth/login");
    }

};

const showRegistrationForm = ({ render }) => {
    render("registration.eta");
};

export { registerUser , showRegistrationForm };