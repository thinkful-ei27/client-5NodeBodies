import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../utils/local-storage';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { endStudentAdventure } from '../actions/student'

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken()
    return <Redirect to="/login" />;
  }

  ifAdventureRemoveAdventure() {
    if (this.props.studentAdventure) {
      this.props.dispatch(endStudentAdventure())
    }
  }

  render() {
    // Only render log out button if we are logged in
    let navButtons, homeButton, pathCheck;
    pathCheck = (this.props.location.pathname === '/');
    homeButton = <Link to="/">
      <button
        className="home-button on-left"
        type="button"
        onClick={(e) => this.ifAdventureRemoveAdventure()}
      >Home</button>
    </Link>;
    if (this.props.loggedIn) {
      navButtons = <nav 
        role="navigation"
        className="nav-buttons col-6">
        {!pathCheck && homeButton}
        <Link to="/dashboard">
          <button
            className="dashboard-button on-left on-right"
            type="button"
          >Dashboard</button>
        </Link>
        <button
          className="logout-button on-right on-left wide-button"
          type="button"
          onClick={() => {
            this.logOut()
          }}>Log Out</button>
      </nav>
    } else {
      navButtons = <nav
        role="navigation" className="nav-buttons col-6">
        {!pathCheck && homeButton}
      </nav>
    }
    return (
      <header role="banner" className="header-bar">
        <h1 className="app-title col-6"
        >LearnVenture</h1>
        {navButtons}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  studentAdventure: state.student.adventure
});

export default withRouter(connect(mapStateToProps)(Headerbar));
