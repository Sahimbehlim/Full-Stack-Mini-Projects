const { Router } = require("express");
const {
  handleAddBlog,
  handleReadFullBlog,
  handleComment,
  handleDeleteBlog,
} = require("../controllers/blog-controller");
const upload = require("../services/storage");
const router = Router();

// Add blog with file upload
router.post("/add", upload.single("coverimage"), handleAddBlog);

// Comment on a blog
router.post("/:blogID/comment", handleComment);

// Read or delete a blog
router.route("/:blogID").get(handleReadFullBlog).delete(handleDeleteBlog);

module.exports = router;
