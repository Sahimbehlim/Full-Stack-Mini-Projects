const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Generate a JWT Token
function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImageURL: user.profileImageURL,
    },
    secret,
    { expiresIn: "1d" } // Token expires in 1 day
  );
}

// Decode & Verify JWT Token
function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Invalid or Expired Token:", error.message);
    return null;
  }
}

module.exports = { setUser, getUser };
