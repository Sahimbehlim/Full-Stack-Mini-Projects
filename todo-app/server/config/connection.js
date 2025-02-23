const mongoose = require("mongoose");

async function connectToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = { connectToDB };
