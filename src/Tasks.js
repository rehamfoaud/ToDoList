// ToDoList.js
import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid';
import TodosContext from './Context/TodosContext';  // استيراد الـ Context
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './components/ToDo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);  // استخدام الـ Context
  const [formInput, setFormInput] = useState({ title: "", description: "" });
  const [alignment, setAlignment] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todos'));
    if (savedTasks) {
      setTodos(savedTasks);
    }
  }, [setTodos]);

  function handleAddTask() {
    if (formInput.title === "") {
      alert("Please Enter a Task");
      return;
    }
    const newTask = {
      id: uuid4(),
      title: formInput.title,
      description: formInput.description,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setFormInput({ title: "", description: "" });
  }

  function handleCheckIcon(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };  // تحديث حالة المهمة
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function handleDeleteItem(id) {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function handleSubmitUpdate(id, updatedData) {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, title: updatedData.title, description: updatedData.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  const filteredTodos = todos.filter((todo) => {
    if (alignment === 'completed') {
      return todo.isCompleted;
    }
    if (alignment === 'non_completed') {
      return !todo.isCompleted;
    }
    return true;
  });

  const toDoList = filteredTodos.map((t) => (
    <ToDo
      key={t.id}
      todo={t}
      handleCheck={handleCheckIcon}
      handleDelete={handleDeleteItem}
      handleUpdate={handleSubmitUpdate}
    />
  ));

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: 550 }}>
          <CardContent>
            <Typography variant="h2" gutterBottom sx={{ color: '#8a2828' }}>
              My Tasks
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              className="mt-3 rounded-2 bg-body"
            >
              <ToggleButton style={{ color: '#8a2828' }} className=" px-5" value="all">All</ToggleButton>
              <ToggleButton style={{ color: '#8a2828' }} className=" px-5" value="completed">Completed</ToggleButton>
              <ToggleButton style={{ color: '#8a2828' }} value="non_completed">Non-Completed</ToggleButton>
            </ToggleButtonGroup>

            <div style={{ maxHeight: "500px", overflowY: "auto", marginTop: "1rem" }}>
              {toDoList}
            </div>

            <Grid container spacing={1} className="mt-3 d-flex justify-content-center align-items-center">
              <Grid size={8} display="flex" alignItems="center" justifyContent="space-around" className="text-danger">
                <TextField
                  className="text-success w-100"
                  id="standard-basic"
                  label="Add Task Title"
                  variant="standard"
                  value={formInput.title}
                  onChange={(event) => setFormInput({ ...formInput, title: event.target.value })}
                />
              </Grid>
              <Grid size={4} display="flex" alignItems="center" justifyContent="space-around" className="text-danger">
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#8a2828' }}
                  className="px-4 text-light"
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
            <TextField
              className="text-success w-100 mt-3"
              id="standard-basic"
              label="Add Task Description"
              variant="standard"
              value={formInput.description}
              onChange={(event) => setFormInput({ ...formInput, description: event.target.value })}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
