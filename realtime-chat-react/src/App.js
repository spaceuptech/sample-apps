import React from "react";
import "./App.css";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ChatPage } from "./pages";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* <ChatPage /> */}
      <LoginRegisterPage/>
    </MuiThemeProvider>
  );
}

export default App;