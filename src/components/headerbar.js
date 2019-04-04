import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../utils/local-storage';
import { withRouter, Redirect, Link } from 'react-router-dom';

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken()
    return <Redirect to="/login" />;
  }

  render() {
    // Only render log out button if we are logged in
    let navButtons;
    if (this.props.loggedIn) {
      navButtons = <div className="nav-buttons col-6">
        <Link to="/">
          <button
            className="home-button on-left"
            type="button"
          >Home</button>
        </Link>
        <Link to="/dashboard">
          <button
            className="home-button on-left on-right"
            type="button"
          >Dashboard</button>
        </Link>
        <button
          className="logout-button on-right on-left"
          type="button"
          onClick={() => {
            this.logOut()
          }}>Log Out</button>
      </div>
    } else {
      navButtons = <div className="nav-buttons col-6">
        <Link to="/">
          <button
            className="home-button on-left"
            type="button"
          >Home</button>
        </Link>
      </div>
    }
    return (
      <header className="header-bar row">
        <h1 className="app-title col-6"
        >LearnVenture</h1>
        {navButtons}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Headerbar));
