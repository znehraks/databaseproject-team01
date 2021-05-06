import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import EmpAdmin from "../Routes/EmpAdmin";
import ProjectAdmin from "../Routes/ProjectAdmin";
import ClientAdmin from "../Routes/ClientAdmin";
import Auth from "../Routes/Auth";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Auth" component={Auth}></Route>
      <Route exact path="/EmpAdmin/:mode" component={EmpAdmin}></Route>
      <Route exact path="/ProjectAdmin" component={ProjectAdmin}></Route>
      <Route exact path="/ClientAdmin" component={ClientAdmin}></Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
