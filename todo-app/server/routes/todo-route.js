const express = require("express");
const {
  getTodos,
  addTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  toggleIsCompletedHandler,
} = require("../controllers/todo-controller");

const router = express.Router();

router.route("/").get(getTodos).post(addTodoHandler);
router.route("/:id").patch(updateTodoHandler).delete(deleteTodoHandler);
router.patch("/isCompleted/:id", toggleIsCompletedHandler);

module.exports = router;
