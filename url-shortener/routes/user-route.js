const express = require("express");
const router = express.Router();
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user-controller");

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
