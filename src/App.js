import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { refreshAuthToken } from './actions/auth';
import Headerbar from './components/headerbar.js';
import Login from './components/login.js';
import RegisterForm from './components/registration';
import AdventureForm from './components/newAdventure'
import Dashboard from './components/dashboard'
import AdventureBuilder from './components/adventureBuilder'
import StudentLanding from './components/studentLandingPage'
import './App.css';
import adventureBuilder from './components/adventureBuilder';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <Headerbar />
        <Route exact path="/" component={RegisterForm} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/adventure" component={AdventureForm} />
        <Route exact path="/adventure/adventureBuilder" component={AdventureBuilder} />
        <Route exact path="/studentlanding" component={StudentLanding} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
