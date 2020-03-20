import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route component={Form} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
