import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Login from "./login-form";

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  if (props.loggedIn) {
    props.history.push('/dashboard')
  }
  return (
    <div className="">
      <p>Login Below</p>
      <p>New User? Click here to <Link className="login-from-register" to="/registration">Register</Link></p>
      <Login />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
