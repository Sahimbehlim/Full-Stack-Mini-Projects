const Blog = require("../models/blog-schema");
const Comment = require("../models/comment-schema");

async function handleAddBlog(req, res) {
  const { title, content } = req.body;

  if (!title || !content || !req.file) {
    return res
      .status(400)
      .render("add-blog", { err: "All fields are required" });
  }

  try {
    await Blog.create({
      title,
      content,
      createdBy: req.user.id,
      coverImage: `/uploads/${req.file.filename}`,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error adding blog:", error);
    res
      .status(500)
      .render("add-blog", { err: "Failed to add blog. Please try again!" });
  }
}

async function handleReadFullBlog(req, res) {
  const { blogID } = req.params;

  try {
    const blog = await Blog.findById(blogID);
    if (!blog) {
      return res.status(404).render("blog", { err: "Blog Not Found" });
    }

    const comments = await Comment.find({ blogID }).sort({ createdAt: -1 });

    res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).render("blog", { err: "Something went wrong!" });
  }
}

async function handleDeleteBlog(req, res) {
  const { blogID } = req.params;

  try {
    const blog = await Blog.findOneAndDelete({
      _id: blogID,
      createdBy: req.user.id,
    });

    if (!blog) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog!" });
    }

    await Comment.deleteMany({ blogID });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting Blog:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function handleComment(req, res) {
  const { content } = req.body;
  const { blogID } = req.params;

  try {
    await Comment.create({ content, blogID, createdBy: req.user.id });
    res.redirect(`/blog/${blogID}`);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).redirect(`/blog/${blogID}`);
  }
}

module.exports = {
  handleAddBlog,
  handleReadFullBlog,
  handleComment,
  handleDeleteBlog,
};
