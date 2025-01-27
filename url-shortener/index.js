const express = require("express");
const { connectToMongoDB } = require("./config/connection");
const urlRoute = require("./routes/url_route");
const URL = require("./models/url_schema");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

// MongoDB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/backend-practice");

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  const urls = await URL.find();
  res.render("index", { urls });
});
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:http://localhost:${PORT}`);
});
