import React from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { AuthRoute, ProtectedRoute } from "../util/route";

export default () => (
  <>
    <Route exact path="/" component={Welcome} />
    <AuthRoute path="/login" component={Login} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
  </>
);
