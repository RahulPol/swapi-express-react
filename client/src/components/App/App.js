import React from "react";
import { Route } from "react-router-dom";
// import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import { AuthRoute, ProtectedRoute } from "../../util/route";

export default () => (
  <>
    {/* <Route exact path="/" component={Welcome} /> */}
    <AuthRoute path="/" component={Login} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
  </>
);
