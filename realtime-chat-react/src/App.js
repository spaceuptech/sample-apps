import React from "react";
import "./App.css";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Routes from "./Routes";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;