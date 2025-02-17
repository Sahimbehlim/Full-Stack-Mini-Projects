require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./config/connection");
const { checkForAuthentication } = require("./middlewares/auth");

const staticRoute = require("./routes/static-routes");
const userRoute = require("./routes/user-routes");
const blogRoute = require("./routes/blog-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");

// Connection
connectToMongoDB(process.env.MONGO_URL);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkForAuthentication("token"));

// Routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);

try {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
} catch (error) {
  console.log("Error running server", error);
}
