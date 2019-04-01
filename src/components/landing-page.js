import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RegisterForm from "./registration";

export function LandingPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  if (props.loggedIn) {
    console.log("Redirecting")
    props.history.push('/dashboard')
  }
  return (
    <div className="landing-page">
      <RegisterForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default withRouter(connect(mapStateToProps)(LandingPage));
