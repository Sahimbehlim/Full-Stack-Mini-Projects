const { getUser } = require("../service/auth");

function checkAuth(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    req.user = null;
    return next();
  }

  const user = getUser(token);

  if (!user) {
    console.error("Invalid or expired token");
    req.user = null;
    return next();
  }

  req.user = user;
  next();
}

module.exports = { checkAuth };
