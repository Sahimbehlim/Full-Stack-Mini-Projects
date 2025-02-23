const Todo = require("../models/todo-schema");
const mongoose = require("mongoose");

// Define allowed categories
const CATEGORIES = ["Work", "Personal", "Study", "Fitness"];

// Validate category function
const isValidCategory = (category) => CATEGORIES.includes(category);

// Get all todos
async function getTodos(req, res) {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Add a new todo
async function addTodoHandler(req, res) {
  const { title, category, isCompleted } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title & category are required" });
  }

  if (!isValidCategory(category)) {
    return res.status(400).json({
      error:
        "Invalid category. Please choose from 'Work', 'Personal', 'Study', or 'Fitness'.",
    });
  }

  try {
    const newTodo = await Todo.create({ title, category, isCompleted });
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({ error: "Failed to create todo", details: error.message });
  }
}

// Update a todo
async function updateTodoHandler(req, res) {
  const { id } = req.params;
  const { title, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }

  if (!title || !category) {
    return res.status(400).json({ error: "Title & category are required" });
  }

  if (!isValidCategory(category)) {
    return res.status(400).json({
      error:
        "Invalid category. Choose from 'Work', 'Personal', 'Study', or 'Fitness'.",
    });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, category },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found to update" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res
      .status(500)
      .json({ error: "Failed to update todo", details: error.message });
  }
}

// Delete a todo
async function deleteTodoHandler(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found to delete" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", id: deletedTodo._id });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res
      .status(500)
      .json({ error: "Failed to delete todo", details: error.message });
  }
}

// Toggle isCompleted status
async function toggleIsCompletedHandler(req, res) {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo toggled successfully", updatedTodo });
  } catch (error) {
    console.error("Error toggling todo:", error);
    res
      .status(500)
      .json({ error: "Failed to toggle todo", details: error.message });
  }
}

module.exports = {
  getTodos,
  addTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  toggleIsCompletedHandler,
};
