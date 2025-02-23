import React, { useEffect, useState, useCallback } from "react";
import TodoForm from "./TodoForm";
import { fetchTodos, deleteTodo, toggleIsCompleted } from "../api/todoApi";
import { TodoProvider } from "../todoContext";
import { ToastContainer, toast } from "react-toastify";

const Todo = () => {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        toast.error("Failed to fetch todos.");
      }
    };
    getAllTodos();
  }, []);

  const handleDelete = useCallback(async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toast.error("Todo deleted!", { autoClose: 1500 });
    } catch (error) {
      toast.error("Failed to delete todo.");
    }
  }, []);

  const handleUpdate = useCallback(
    (id) => {
      setShowForm(true);
      const currentTodo = todos.find((todo) => todo._id === id);
      setEditedTodo(currentTodo);
    },
    [todos]
  );

  const handleFilter = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleToggle = useCallback(async (todo) => {
    const { _id, isCompleted } = todo;
    const newStatus = !isCompleted;

    try {
      await toggleIsCompleted(_id, newStatus);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, isCompleted: newStatus } : todo
        )
      );
    } catch (error) {
      toast.error("Failed to toggle todo.");
    }
  }, []);

  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter(
          (todo) =>
            todo.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <TodoProvider value={{ editedTodo, setEditedTodo, setTodos, setShowForm }}>
      <div
        className="min-h-screen w-full bg-gradient-to-tl from-gray-400 to-gray-600 flex
    flex-col items-center justify-start px-4"
      >
        <ToastContainer />
        <h2 className="text-white text-2xl font-semibold my-4">Todo App</h2>
        <main className="w-full max-w-3xl bg-transparent rounded-md flex flex-col gap-y-4 items-center">
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => setShowForm(true)}
              type="button"
              className="text-white bg-zinc-900 hover:bg-zinc-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              Add Todo
            </button>
            <select
              value={selectedCategory}
              onChange={handleFilter}
              className="text-white bg-zinc-900 text-sm rounded-lg block p-2.5 focus:outline-none"
            >
              {["All", "Work", "Personal", "Study", "Fitness"].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="w-full bg-gray-700 text-gray-200 rounded-lg p-4 flex flex-col gap-y-3">
            {filteredTodos.length === 0 && (
              <p className="text-red-300 text-center font-medium">
                No todos available
              </p>
            )}
            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={`text-black rounded-md px-3 py-2.5 flex items-center justify-between ${
                  todo.isCompleted ? "bg-[#c6e9a7]" : "bg-gray-300"
                } transition duration-300`}
              >
                <div className="flex items-center gap-x-3">
                  <input
                    checked={todo.isCompleted}
                    onChange={() => handleToggle(todo)}
                    type="checkbox"
                    className="cursor-pointer size-3.5"
                  />
                  <div className="flex flex-col text-sm">
                    <h2
                      className={`capitalize font-medium ${
                        todo.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </h2>
                    <p className="text-gray-800 italic">{todo.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 sm:text-lg">
                  <button
                    disabled={todo.isCompleted}
                    onClick={() => handleUpdate(todo._id)}
                    className={`ri-edit-box-line disabled:opacity-50`}
                  ></button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="ri-delete-bin-7-line"
                  ></button>
                </div>
              </div>
            ))}
          </div>
        </main>
        {showForm && <TodoForm />}
      </div>
    </TodoProvider>
  );
};

export default Todo;
