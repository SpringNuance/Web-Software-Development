import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, render, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(params.get("email"));
  if (userFromDatabase.length != 1) {
    // No such user, but still we must say that login credentials were incorrect
    // Otherwise the user could test whether an email has been registrated or not...
    render("login.eta", { loginError: "Login credentials were incorrect" });
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(params.get("password"), user.password);

  if (!passwordMatches) {
    // Password was incorrect but email was correct
    render("login.eta", { loginError: "Login credentials were incorrect" });
    return;
  }

  await state.session.set("user", user);
  response.redirect("/questions");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

const logout = async({ state, response }) => {
  await state.session.set("user", undefined);
  response.redirect("/auth/login");
};

export { processLogin, showLoginForm, logout };