import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import SixNumber from "./containers/SixNumber";
import BusChecker from "./containers/BusChecker";
import CarparkInfo from "./containers/CarparkInfo";
import MTRChecker from "./containers/MTRChecker";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [currentPage, setCurrentPage] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    setCurrentPage(localStorage.getItem("lastPage") || "SixNumber");
  }, []);

  const selectPage = (page) => {
    setCurrentPage(page);
    localStorage.setItem("lastPage", page);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Button color="inherit" onClick={() => selectPage("SixNumber")}>
                SixNumber
              </Button>
              <Button color="inherit" onClick={() => selectPage("BusChecker")}>
                BusChecker
              </Button>
              <Button color="inherit" onClick={() => selectPage("CarparkInfo")}>
                CarparkInfo
              </Button>
              <Button color="inherit" onClick={() => selectPage("MTRChecker")}>
              MTRChecker
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <div className="Main">
          {currentPage === "SixNumber" && <SixNumber />}
          {currentPage === "BusChecker" && <BusChecker />}
          {currentPage === "CarparkInfo" && <CarparkInfo />}
          {currentPage === "MTRChecker" && <MTRChecker />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
