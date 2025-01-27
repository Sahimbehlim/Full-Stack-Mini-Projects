const express = require("express");
const router = express.Router();
const {
  handleCreateShortURL,
  handleRedirectToOriginalURL,
  handleDeleteURL,
} = require("../controllers/url_controller");

// Route to create a short URL
router.post("/", handleCreateShortURL);

// Route to redirect to the original URL & delete URL
router
  .route("/:shortURL")
  .get(handleRedirectToOriginalURL)
  .delete(handleDeleteURL);

module.exports = router;
