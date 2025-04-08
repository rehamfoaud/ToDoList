// App.js
import React from 'react';
import { TodosProvider } from './Context/TodosContext';  // استيراد الـ Provider
import ToDoList from './Tasks';  // استيراد مكون الـ ToDoList

function App() {
  return (
    <TodosProvider>  {/* تغليف الـ ToDoList بـ TodosProvider */}
      <ToDoList />
    </TodosProvider>
  );
}

export default App;
