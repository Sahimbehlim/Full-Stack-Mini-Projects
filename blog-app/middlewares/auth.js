const { getUser } = require("../services/auth");

function checkForAuthentication(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const user = getUser(token);
      req.user = user || null;
    } catch (error) {
      console.error("Invalid or expired token");
      req.user = null;
    }

    next();
  };
}

module.exports = { checkForAuthentication };
