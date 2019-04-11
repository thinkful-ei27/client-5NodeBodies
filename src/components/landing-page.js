import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import RegisterForm from "./registration";

export class LandingPage extends React.Component {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the main browse area
  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="landing-page" >
        <p>New User? Register Below</p>
        <p>Or click here to <Link className="login-from-register" to="/login">Login</Link></p>
        <RegisterForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LandingPage);
