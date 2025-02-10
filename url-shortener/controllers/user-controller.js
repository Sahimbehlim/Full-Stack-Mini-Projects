const User = require("../models/user-model");
const { setUser } = require("../service/auth");

// Handle User Sign Up
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render("signup", { err: "All fields are required" });
  }

  try {
    await User.create({ name, email, password });
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res.render("signup", { err: "Email already exists" });
    }
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Handle User Login
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", { err: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { err: "Invalid Username or Password" });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Handle User Logout
function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
};
