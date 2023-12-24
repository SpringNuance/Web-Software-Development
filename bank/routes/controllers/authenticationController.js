import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import { executeQuery } from "../../database/database.js";
import * as userService from "../../services/userService.js";

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");

  if (password !== verification) {
    response.body = "The entered passwords did not match";
    return;
  }

  const existingUsers = await userService.findUsersWithEmail(email);
  if (existingUsers.rows.length > 0) {
    response.body = "The email is already reserved.";
    return;
  }

  const hash = await bcrypt.hash(password);
  await userService.addUser(email, hash);
  response.redirect("/auth/login");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

const postLoginForm = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  const existingUsers = await userService.findUsersWithEmail(email);
  if (existingUsers.rows.length === 0) {
    response.status = 401;
    return;
  }

  // take the first row from the results
  const userObj = existingUsers.rows[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }

  await state.session.set("authenticated", true);
  await state.session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.redirect("/accounts");
};

const showAccounts = async ({ render, response, state }) => {
  const authenticated = await state.session.get("authenticated");
  if (!authenticated) {
    response.status = 401;
    return;
  }
  const userId = (await state.session.get("user")).id;
  const res = await executeQuery(
    "SELECT * FROM accounts WHERE user_id = $1",
    userId
  );
  render("accounts.eta", { accounts: res.rows });
};

const postAccount = async ({ request, response, state }) => {
  const authenticated = await state.session.get("authenticated");
  if (!authenticated) {
    response.status = 401;
    return;
  }
  const body = request.body();
  const params = await body.value;
  const nameExtracted = params.get("name");
  const userId = (await state.session.get("user")).id;

  await executeQuery(
    "INSERT INTO accounts (name, user_id) VALUES ($1, $2);",
    nameExtracted,
    userId
  );

  response.redirect("/accounts");
};

const showAccountForm = async ({ params, render, response, state }) => {
  const authenticated = await state.session.get("authenticated");
  if (!authenticated) {
    response.status = 401;
    return;
  }
  const userId = (await state.session.get("user")).id;
  const res = await executeQuery(
    "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
    params.id,
    userId
  );
  const data = {
    id: res.rows[0].id,
    name: res.rows[0].name,
    balance: res.rows[0].balance,
  };
  render("account.eta", data);
};

const postDeposit = async ({ params, request, response, state }) => {
  const authenticated = await state.session.get("authenticated");
  if (!authenticated) {
    response.status = 401;
    return;
  }
  const userId = (await state.session.get("user")).id;
  const res = await executeQuery(
    "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
    params.id,
    userId
  );
  if (res.rows.length > 0) {
    const currentAccount = res.rows[0];
    const body = request.body();
    const paramsRequest = await body.value;
    const amountExtracted = paramsRequest.get("amount");
    const currentBalance = currentAccount.balance;
    const newBalance = Number(currentBalance) + Number(amountExtracted);
    await executeQuery(
      "UPDATE accounts SET balance = $1 WHERE id = $2;",
      Number(newBalance),
      params.id
    );
  } else {
    response.status = 401;
    return;
  }
  response.redirect("/accounts");
};

const postWithdraw = async ({ params, request, response, state }) => {
  const authenticated = await state.session.get("authenticated");
  if (!authenticated) {
    response.status = 401;
    return;
  }
  const userId = (await state.session.get("user")).id;
  const res = await executeQuery(
    "SELECT * FROM accounts WHERE id = $1 AND user_id = $2",
    params.id,
    userId
  );
  if (res.rows.length > 0) {
    const currentAccount = res.rows[0];
    const body = request.body();
    const paramsRequest = await body.value;
    const amountExtracted = paramsRequest.get("amount");
    const currentBalance = currentAccount.balance;
    const newBalance = Number(currentBalance) - Number(amountExtracted);
    await executeQuery(
      "UPDATE accounts SET balance = $1 WHERE id = $2;",
      Number(newBalance),
      params.id
    );
  } else {
    response.status = 401;
    return;
  }
  response.redirect("/accounts");
};

export {
  postLoginForm,
  postRegistrationForm,
  showLoginForm,
  showRegistrationForm,
  showAccounts,
  postAccount,
  showAccountForm,
  postDeposit,
  postWithdraw,
};
