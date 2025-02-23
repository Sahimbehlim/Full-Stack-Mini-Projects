import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

// Get all todos
export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Add a new todo
export const addTodo = async (todoData) => {
  try {
    const response = await axios.post(API_URL, todoData);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Toggle isCompleted status
export const toggleIsCompleted = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/isCompleted/${id}`, {
      isCompleted: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
};
