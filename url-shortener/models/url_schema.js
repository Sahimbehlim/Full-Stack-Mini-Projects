const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true, unique: true },
    totalVisits: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// Instance method to increment visit count
urlSchema.methods.incrementVisits = async function () {
  this.totalVisits += 1;
  await this.save();
};

module.exports = mongoose.model("Url", urlSchema);
