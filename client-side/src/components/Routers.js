import React, { Component } from "react";
import {
  StudentHome,
  AdminHome,
  TeacherHome,
  UserSignUp,
  UserSignIn,
  AdminSignIn,
  Verify,
  Home,
  ListTeacher,
  Detailteacher
} from "../pages";
import { Router, Switch, Route } from "react-router-dom";
import { withAuth } from "../utils";
import history from "../utils/history";

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/admin/sign-in" component={AdminSignIn} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/sign-in" component={UserSignIn} />
          <Route path="/" component={Detailteacher} />
          <Route path="/list-teacher" component={ListTeacher} />
          <Route path="/student" component={withAuth(StudentHome)} />
          <Route path="/admin" component={withAuth(AdminHome)} />
          <Route path="/teacher" component={withAuth(TeacherHome)} />
          <Route path="*">404 - Not Found!</Route>
        </Switch>
      </Router>
    );
  }
}
export default Routers;
