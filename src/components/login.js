import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import Login from "./login-form";

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  const { loggedIn } = props;
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="mt-32 container mx-auto">
      <h2 className="mb-4">Login</h2>
      <Login />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
