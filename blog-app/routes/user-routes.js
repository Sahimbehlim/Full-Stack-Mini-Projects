const { Router } = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user-controller");
const router = Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
