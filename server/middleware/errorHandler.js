export function errorHandler(error, req, res, next) {
  console.error(error);

  // TODO: Decide what details are safe to send to a browser in a real app.
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server.",
  });
}
