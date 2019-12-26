import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ReactDOM from "react-dom";
import "./index.css";
import { Routers } from "./components";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import MomentUtils from "@date-io/moment";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#efa434",
      dark: "#d18719",
      light: "#e8b05d",
      contrastText: "#fff"
    }
  }
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider>
          <Routers />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
