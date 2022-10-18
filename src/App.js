import React from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import Todolista from "./components/Todolist_Alisa.js";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To Do List
        </Typography>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={tabIndex}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Home" />
          <Tab label="To do" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <Typography>
          <Todolista></Todolista>
        </Typography>
      )}
      {tabIndex === 1 && <Todolist></Todolist>}
    </div>
  );
}

export default App;
