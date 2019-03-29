import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import Login from "./login-form";

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  if (props.loggedIn) {
    console.log("Redirecting")
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="">
      <Login />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
