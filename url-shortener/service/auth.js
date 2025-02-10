const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Generate JWT Token for a User
const setUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret
  );
};

// Verify and Decode JWT Token
const getUser = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
};

module.exports = { setUser, getUser };
