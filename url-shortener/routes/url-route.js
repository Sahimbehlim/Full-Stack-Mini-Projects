const express = require("express");
const router = express.Router();
const {
  handleGenerateShortURL,
  handleRedirectToOriginalURL,
  handleDeleteURL,
} = require("../controllers/url-controller");

router.post("/", handleGenerateShortURL);

router
  .route("/:shortURL")
  .get(handleRedirectToOriginalURL)
  .delete(handleDeleteURL);

module.exports = router;
