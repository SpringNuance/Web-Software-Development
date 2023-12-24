const redirectTo = async (request, path) => {
  request.respond({
    status: 303,
    headers: new Headers({
      "Location": path,
    }),
  });
};

export { redirectTo };