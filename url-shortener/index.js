require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const staticRoute = require("./routes/static-route");
const userRoute = require("./routes/user-route");
const urlRoute = require("./routes/url-route");
const { connectToMongoDB } = require("./config/connection");
const { checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");

// MongoDB Connection
connectToMongoDB(process.env.MONGOURL);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/url", checkAuth, urlRoute);

// Start Server
try {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
}
