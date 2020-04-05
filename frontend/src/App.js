import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Welcome from "./scenes/Welcome";
import Filter from "./scenes/GreyscaleFilter";
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact key="welcome" component={Welcome} />
      <Route path="/filter" key="filter" component={Filter} />
      <Redirect to="/" />
    </Switch>
  );
}
export default App;
