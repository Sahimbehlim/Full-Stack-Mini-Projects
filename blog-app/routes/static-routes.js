const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog-schema");

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.user) return res.redirect("/login");
  next();
};

// Home page with blog listing
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).lean();
    res.render("home", { user: req.user, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Signup & login pages
router.get("/signup", (req, res) =>
  req.user ? res.redirect("/") : res.render("signup")
);
router.get("/login", (req, res) =>
  req.user ? res.redirect("/") : res.render("login")
);

// Add blog page (Protected Route)
router.get("/add-blog", requireAuth, (req, res) => {
  res.render("add-blog", { user: req.user });
});

// My blogs page (Protected Route)
router.get("/my-blogs", requireAuth, async (req, res) => {
  try {
    const myBlogs = await Blog.find({ createdBy: req.user.id }).lean();
    res.render("my-blogs", { user: req.user, myBlogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
