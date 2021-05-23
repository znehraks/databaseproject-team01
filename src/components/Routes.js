import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import EmpAdmin from "../Routes/EmpAdmin";
import emp_detail from "../Routes/EmpAdmin/emp_detail";
import ProjectAdmin from "../Routes/ProjectAdmin";
import project_detail from "../Routes/ProjectAdmin/project_detail.js";
import ClientAdmin from "../Routes/ClientAdmin";
import DepartmentAdmin from "../Routes/req01/DepartmentAdmin";
import req07 from "../Routes/req07";
import Req08 from "../Routes/req08";
import Req08Detail from "../Routes/req08/Detail";
import Auth from "../Routes/Auth";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Auth" component={Auth}></Route>
      <Route exact path="/EmpAdmin/:mode" component={EmpAdmin}></Route>
      <Route
        exact
        path="/EmpDetailAdmin/:emp_no"
        component={emp_detail}
      ></Route>
      <Route exact path="/ProjectAdmin/:mode" component={ProjectAdmin}></Route>
      <Route exact path="/DepartmentAdmin" component={DepartmentAdmin}></Route>
      <Route
        exact
        path="/ProjectDetailAdmin/:project_no"
        component={project_detail}
      ></Route>
      <Route exact path="/ClientAdmin" component={ClientAdmin}></Route>
      <Route exact path="/ProjectProceeding" component={req07}></Route>
      <Route exact path="/ProjectArrange" component={Req08}></Route>
      <Route
        exact
        path="/ProjectArrangeDetail/:emp_no"
        component={Req08Detail}
      ></Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
