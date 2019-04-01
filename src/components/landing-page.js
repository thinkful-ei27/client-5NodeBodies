import React from "react";
import { connect } from "react-redux";

import RegisterForm from "./registration";

export function LandingPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  if (props.loggedIn) {
    props.history.push('/dashboard')
  }
  return (
    <div className="landing-page">
      <div>This is the registration form!</div>
      <RegisterForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LandingPage);
