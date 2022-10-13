import React from "react";
import "./App.css";
import "./components/React-Tabs";
import Todolist from "./components/Todolist";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
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
      </Box>
      <Box sx={{ margin: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography>Ostin nuget</Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography>
              <Todolist></Todolist>
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
