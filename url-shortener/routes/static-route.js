const express = require("express");
const router = express.Router();
const URL = require("../models/url-model");

// Home Route - Requires User Authentication
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  try {
    const urls = await URL.find({ createdBy: req.user.id });
    return res.render("home", { urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Signup Page
router.get("/signup", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("signup");
});

// Login Page
router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("login");
});

module.exports = router;
