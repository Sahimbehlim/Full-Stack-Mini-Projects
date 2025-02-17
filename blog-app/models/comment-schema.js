const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    blogID: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: true,
      index: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

// Auto-populate `createdBy` on find queries
commentSchema.pre(/^find/, function (next) {
  this.populate("createdBy", "name email profileImageURL");
  next();
});

const Comment = model("comment", commentSchema);
module.exports = Comment;
