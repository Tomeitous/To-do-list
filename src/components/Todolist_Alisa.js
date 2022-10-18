import { AgGridReact } from "ag-grid-react";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Snackbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PlusOneIcon from "@mui/icons-material/PlusOne";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS

function Todolist() {
  // const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const [todo, setTodo] = useState({
    description: "",
    date: null,
    priority: "",
  });

  const [columnDefs] = useState([
    {
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value.toUpperCase() === "HIGH"
          ? { color: "red", backgroundColor: "lightpink" }
          : params.value.toLowerCase() === "medium"
          ? { color: "yellow", backgroundColor: "silver" }
          : params.value.toLowerCase() === "low"
          ? { color: "green", backgroundColor: "lightgreen" }
          : { color: "blue", backgroundColor: "lightblue" },
    },
  ]);

  const addTodo = () => {
    setTodos([todo, ...todos]);
  };

  const inputChanged = (e) => {
    console.log(e);
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const deleteTodo = () => {
    //console.log(gridRef.current.getSelectedNodes()[0].childIndex);
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
      setOpen(true);
    } else {
      alert("select a row first");
    }
  };

  /*const [value, setValue] = React.useState();*/

  const changeDate = (e) => {
    setTodo({ ...todo, date: e });
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={todo.description}
          onChange={inputChanged}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="date"
            value={todo.date}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          variant="standard"
          label="Priority"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}
        />
        <Button
          endIcon={<PlusOneIcon />}
          onClick={addTodo}
          variant="outlined"
          color="success"
        >
          Add
        </Button>
        <Button
          endIcon={<DeleteIcon />}
          onClick={deleteTodo}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </Stack>

      <div
        className="ag-theme-material"
        style={{ margin: "auto", width: "50%", height: 600 }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          rowData={todos}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </div>
      <Snackbar
        open={open}
        message="TRASHED"
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default Todolist;
