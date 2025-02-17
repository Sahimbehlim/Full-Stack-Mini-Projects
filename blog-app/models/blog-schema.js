const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-populate `createdBy` on find queries
blogSchema.pre(/^find/, function (next) {
  this.populate("createdBy", "name email profileImageURL");
  next();
});

const Blog = model("blog", blogSchema);
module.exports = Blog;
