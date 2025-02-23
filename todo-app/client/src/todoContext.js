import { createContext, useContext } from "react";

const todoContext = createContext({
  editedTodo: null,
  setEditedTodo: () => {},
  setTodos: () => {},
  setShowForm: () => {},
});

export const TodoProvider = todoContext.Provider;

export default function useTodo() {
  return useContext(todoContext);
}
