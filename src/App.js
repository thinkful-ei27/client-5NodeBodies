import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { refreshAuthToken } from './actions/auth';
import Headerbar from './components/headerbar.js';
import Login from './components/login.js';
import LandingPage from './components/landing-page';
import AdventureForm from './components/newAdventure'
import Dashboard from './components/dashboard'
import AdventureBuilder from './components/adventureBuilder'
// import CombinedAdventure from './components/combinedAdventure'
import StudentLanding from './components/studentLandingPage'
import GraphContainer from './components/graph-container'
import WrongTurn from './components/wrongTurn'
import Home from './components/home'
import CreateHeadNode from './components/create-head-node'

import AdventureInfo from './components/adventureInfo'
import './App.css';

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/GraphContainer" component={GraphContainer} />
          <Route exact path="/landingPage" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/adventure/headnode" component={CreateHeadNode} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/adventure" component={AdventureForm} />
          <Route exact path="/adventure/adventurebuilder/:id" component={AdventureBuilder} />
          <Route exact path="/studentlanding" component={StudentLanding} />
          <Route exact path="/adventure/:id" component={AdventureInfo} />
          <Route component={WrongTurn} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
