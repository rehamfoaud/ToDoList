// Context/TodosContext.js
import React, { useState, createContext } from 'react';

const TodosContext = createContext();


const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider };
export default TodosContext;
