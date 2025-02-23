import React, { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../api/todoApi";
import useTodo from "../todoContext";
import { toast } from "react-toastify";

const TodoForm = () => {
  const { editedTodo, setEditedTodo, setTodos, setShowForm } = useTodo();
  const [formData, setFormData] = useState({
    title: "",
    category: "Work",
    isCompleted: false,
  });

  useEffect(() => {
    if (editedTodo) {
      setFormData({ title: editedTodo.title, category: editedTodo.category });
    }
  }, [editedTodo]);

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!editedTodo) {
        const { newTodo } = await addTodo(formData);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Todo added!", { autoClose: 1500 });
      } else {
        const { updatedTodo } = await updateTodo(editedTodo._id, formData);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editedTodo._id ? updatedTodo : todo
          )
        );
        toast.info("Todo updated!", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }

    setShowForm(false);
    setEditedTodo(null);
  };

  return (
    <div className="w-full h-screen fixed bg-[#00000090] z-10 flex justify-center items-center px-4">
      <i
        onClick={() => {
          setShowForm(false);
          setEditedTodo(null);
        }}
        className="ri-close-large-line text-white text-2xl fixed right-3 top-2 cursor-pointer transition duration-500 hover:rotate-[360deg]"
      ></i>

      <form
        onSubmit={submitHandler}
        className="bg-white p-4 rounded-md w-full max-w-xl flex flex-col gap-y-3.5"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChanges}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:outline-none"
            placeholder="Enter todo title"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChanges}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:outline-none"
          >
            {["Work", "Personal", "Study", "Fitness"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {editedTodo ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
