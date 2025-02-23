require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/connection");

const todoRoute = require("./routes/todo-route");

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
connectToDB(process.env.MONGO_URL);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todos", todoRoute);

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
