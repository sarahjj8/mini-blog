export function requireInternToken(req, res, next) {
  const authorization = req.get("Authorization");

  // TODO: Inspect this header in DevTools and explain the "Bearer <token>" format.
  if (!authorization) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Missing Authorization header.",
    });
  }

  if (authorization !== "Bearer intern-token") {
    return res.status(403).json({
      error: "Forbidden",
      message: "Authorization header exists, but the token is not allowed.",
    });
  }

  next();
}
