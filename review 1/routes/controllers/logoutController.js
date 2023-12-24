const logout = async ({state, response}) => {
    await state.session.set("user", null);
    response.redirect("/auth/login");
};

export { logout };