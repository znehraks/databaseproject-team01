import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import EmpAdmin from "../Routes/EmpAdmin";
import emp_detail from "../Routes/EmpAdmin/emp_detail";
import ProjectAdmin from "../Routes/ProjectAdmin";
import project_detail from "../Routes/ProjectAdmin/project_detail.js";
import ClientAdmin from "../Routes/ClientAdmin";
import DepartmentAdmin from "../Routes/req01/DepartmentAdmin";
import Req03 from "../Routes/req03";
import Req04 from "../Routes/req04";
import Req05 from "../Routes/req05";
import Req06 from "../Routes/req06";
import req07 from "../Routes/req07";
import Req08Detail from "../Routes/req08/Detail";
import Req08 from "../Routes/req08";
import Req09 from "../Routes/req09";
import Req09Detail from "../Routes/req09/Detail";
import Req10 from "../Routes/req10";
import Emp from "../Routes/req00/Emp";
import Project from "../Routes/req00/Project";
import Department from "../Routes/req00/Department";
import Client from "../Routes/req00/Client";
import Task from "../Routes/req00/Task";
import EmpOnlineAccount from "../Routes/req00/EmpOnlineAccount";
import EmployeeInProject from "../Routes/req00/EmployeeInProject";
import PerformanceEvaluationResume from "../Routes/req00/PerformanceEvaluationResume";
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

      <Route exact path="/Req03" component={Req03}></Route>
      <Route exact path="/Req04" component={Req04}></Route>
      <Route exact path="/Req05" component={Req05}></Route>
      <Route exact path="/Req06" component={Req06}></Route>

      <Route exact path="/ProjectProceeding" component={req07}></Route>
      <Route exact path="/ProjectArrange" component={Req08}></Route>
      <Route
        exact
        path="/ProjectArrangeDetail/:emp_no"
        component={Req08Detail}
      ></Route>

      <Route exact path="/ProjectPMPL" component={Req09}></Route>
      <Route
        exact
        path="/ProjectPMPLDetail/:emp_no"
        component={Req09Detail}
      ></Route>
      <Route exact path="/EmpSalary" component={Req10}></Route>

      {/*기본 요구사항 라우트 */}
      <Route exact path="/Emp" component={Emp}></Route>
      <Route exact path="/Project" component={Project}></Route>
      <Route exact path="/Department" component={Department}></Route>
      <Route exact path="/Client" component={Client}></Route>
      <Route exact path="/Task" component={Task}></Route>
      <Route
        exact
        path="/EmpOnlineAccount"
        component={EmpOnlineAccount}
      ></Route>
      <Route
        exact
        path="/EmployeeInProject"
        component={EmployeeInProject}
      ></Route>
      <Route
        exact
        path="/PerformanceEvaluationResume"
        component={PerformanceEvaluationResume}
      ></Route>

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
