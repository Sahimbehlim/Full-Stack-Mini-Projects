const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    totalVisits: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// Instance method to increment visit count
urlSchema.methods.incrementVisits = async function () {
  this.totalVisits += 1;
  await this.save();
};

const URL = mongoose.model("Url", urlSchema);

module.exports = URL;
