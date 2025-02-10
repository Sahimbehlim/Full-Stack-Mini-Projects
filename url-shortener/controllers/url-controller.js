const URL = require("../models/url-model");
const { nanoid } = require("nanoid");

// Generate Short URL
async function handleGenerateShortURL(req, res) {
  const { fullURL } = req.body;

  if (!fullURL || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(fullURL)) {
    const urls = await URL.find({ createdBy: req.user.id });
    return res.render("home", { err: "A valid URL is required", urls });
  }

  const shortID = nanoid(8);

  try {
    await URL.create({
      originalURL: fullURL,
      shortURL: shortID,
      createdBy: req.user.id,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Redirect to Original URL
async function handleRedirectToOriginalURL(req, res) {
  const { shortURL } = req.params;

  try {
    const result = await URL.findOne({ shortURL });
    if (!result) {
      return res.status(404).json({ err: "Short URL not found" });
    }

    await result.incrementVisits();
    res.redirect(result.originalURL);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Delete URL
async function handleDeleteURL(req, res) {
  const { shortURL } = req.params;

  try {
    const result = await URL.findOneAndDelete({
      shortURL,
      createdBy: req.user.id,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "URL not found or not authorized" });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleGenerateShortURL,
  handleRedirectToOriginalURL,
  handleDeleteURL,
};
