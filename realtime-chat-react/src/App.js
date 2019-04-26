import React from "react";
import "./App.css";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Routes from "./Routes";
import { store } from "./helpers/store";
import { Provider } from 'react-redux'



function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;