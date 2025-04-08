// ToDo.js
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo, handleCheck, handleDelete, handleUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.description,
  });

  const handleSave = () => {
    handleUpdate(todo.id, updatedTodo);
    setEditMode(false);
  };

  return (
    <Card
      sx={{
        marginTop: 2,
        backgroundColor: todo.isCompleted ? "#e0ffe0" : "#fff8f0",
        borderLeft: `5px solid ${todo.isCompleted ? "#4caf50" : "#f57c00"}`,
      }}
    >
      <CardContent>
        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Title"
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Description"
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, details: e.target.value })
              }
              multiline
              rows={2}
              className="mt-2"
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {todo.description}
            </Typography>
          </>
        )}

        <div className="d-flex justify-content-end mt-3 gap-2">
          <IconButton
            onClick={() => handleCheck(todo.id)}
            aria-label="check"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#555",
              color: todo.isCompleted ? "green" : "white",
            }}
          >
            <DoneIcon />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(todo.id)}
            aria-label="delete"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#d32f2f",
              color: "white",
            }}
          >
            <DeleteIcon />
          </IconButton>

          {editMode ? (
            <IconButton
              onClick={handleSave}
              aria-label="save"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                color: "white",
              }}
            >
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setEditMode(true)}
              aria-label="edit"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ffa000",
                color: "white",
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
