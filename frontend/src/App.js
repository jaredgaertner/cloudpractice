import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Welcome from "./scenes/Welcome";
import Filter from "./scenes/GreyscaleFilter";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Welcome to the Cloudpractice Greyscale Image Filter
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/" exact key="welcome" component={Welcome} />
          <Route path="/filter" key="filter" component={Filter} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
  );
}
export default App;
