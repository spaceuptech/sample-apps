import React from "react";
import "./App.css";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ChatPage } from "./pages";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ChatPage />
    </MuiThemeProvider>
  );
}

export default App;