const URL = require("../models/url_schema");
const { nanoid } = require("nanoid");

async function handleCreateShortURL(req, res) {
  const { fullURL } = req.body;
  const shortID = nanoid(8);

  if (!fullURL || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(fullURL)) {
    return res.status(400).json({ error: "A valid URL is required" });
  }

  await URL.create({ originalURL: fullURL, shortURL: shortID });

  res.redirect("/");
}

async function handleRedirectToOriginalURL(req, res) {
  const { shortURL } = req.params;
  const result = await URL.findOne({ shortURL });

  if (!result) return res.status(404).json({ message: "Short URL not found" });

  await result.incrementVisits();

  res.redirect(result.originalURL);
}

async function handleDeleteURL(req, res) {
  const { shortURL } = req.params;
  const result = await URL.findOneAndDelete({ shortURL });

  if (!result)
    return res.status(404).json({ message: "Can't find URL to delete" });

  res.sendStatus(200);
}

module.exports = {
  handleCreateShortURL,
  handleRedirectToOriginalURL,
  handleDeleteURL,
};
