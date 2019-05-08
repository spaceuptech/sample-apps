import React from "react";
import "./App.css";
import theme from "./Theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Routes from "./Routes";
import { store } from "./helpers/store";
import { Provider } from 'react-redux'
import { Notify } from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Notify />

        <Routes />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;