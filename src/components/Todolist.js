import { AgGridReact } from "ag-grid-react";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { Snackbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function Todolist() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);

  const gridRef = useRef();

  const [columnDefs] = useState([
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    {
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ]);

  const addTodo = () => {
    console.log(date);
    setTodos([
      { date: date, description: description, priority: priority },
      ...todos,
    ]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0)
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    else {
      alert("select row first");
    }
  };
  return (
    <div>
      Todolist<p></p>
      <Stack justifyContent="center" direction="row" spacing={2}>
        <TextField
          variant="outlined"
          placeholder="priority"
          type="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        ></TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="date"
            value={date}
            onChange={(e) => setDate(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          variant="outlined"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <Button startIcon={<AccessibleIcon />} onClick={addTodo}>
          add
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          action={deleteTodo}
        />
        <Button color="error" startIcon={<DeleteIcon />} onClick={deleteTodo}>
          delete
        </Button>
      </Stack>
      <div
        className="ag-theme-material"
        style={{ margin: "auto", width: "40%", height: 600 }}
      >
        <AgGridReact
          ref={gridRef}
          animateRows={true}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          rowData={todos}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;
