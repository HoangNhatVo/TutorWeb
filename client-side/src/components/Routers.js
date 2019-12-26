import React, { Component } from "react";
import {
  StudentHome,
  Moderators,
  TeacherHome,
  UserSignUp,
  UserSignIn,
  AdminSignIn,
  UserProfileEdit,
  UserProfileShow,
  ContractsEdit,
  ContractsView,
  ResetPasswordToken,
  Verify,
  Reclamations,
  ResetPassword,
  Users,
  Tags,
  Contracts,
  Income,
  Home
} from "../pages";
import { Router, Switch, Route } from "react-router-dom";
import { withAuth, noAuth } from "../utils";
import history from "../utils/history";

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/admin/sign-in" component={noAuth(AdminSignIn)} />
          <Route path="/sign-up" component={noAuth(UserSignUp)} />
          <Route path="/sign-in" component={noAuth(UserSignIn)} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/resetpassword/:token" component={ResetPasswordToken} />
          <Route path="/reset-password" component={ResetPassword} />

          <Route
            path="/admin/moderators"
            component={withAuth(Moderators, [1, 3])}
          />
          <Route path="/admin/tags" component={withAuth(Tags, [3])} />
          <Route path="/admin/users" component={withAuth(Users, [3])} />
          <Route path="/admin/contracts" component={withAuth(Contracts, [3])} />
          <Route path="/admin/income" component={withAuth(Income, [3])} />
          <Route
            path="/admin/reclamations"
            component={withAuth(Reclamations, [3])}
          />

          <Route path="/teacher" component={withAuth(TeacherHome, [2])} />
          <Route path="/student" component={withAuth(StudentHome, [1])} />

          <Route
            path="/contract/:id/create-contract"
            component={withAuth(ContractsEdit, [1])}
          />
          <Route
            path="/contract/:id"
            component={withAuth(ContractsView, [1, 2])}
          />
          <Route
            path="/profile/:id"
            component={withAuth(UserProfileShow, [1, 2, 3])}
          />
          <Route
            path="/profile"
            exact
            component={withAuth(UserProfileEdit, [1, 2])}
          />
          <Route path="/" component={Home} />
          <Route path="*">404 - Not Found!</Route>
        </Switch>
      </Router>
    );
  }
}
export default Routers;
