const User = require("../models/user-schema");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render("signup", { err: "All fields are required" });
  }

  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).render("signup", { err: "User already exists" });
    }

    await User.create({ name, email, password });
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", { err: "All fields are required" });
  }

  try {
    const user = await User.matchPassword(email, password);
    if (!user) {
      return res
        .status(401)
        .render("login", { err: "Incorrect Email or Password" });
    }

    const token = setUser(user);
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .render("login", { err: "Something went wrong, please try again" });
  }
}

function handleUserLogout(req, res) {
  res.clearCookie("token").redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin, handleUserLogout };
