import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { getAllAdventures } from '../actions/createAdventure'
import { toggleOnboarding } from '../actions/auth'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllAdventures());
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding)
  }

  dashboardOnboarding() {
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="dashboardOnboarding arrowBox_Top">
        <span>Welcome to LearnVenture! Let's start by creating a new LearnVenture</span>
        <span>If you'd like help learning how to use this site, click "Create LearnVenture" above</span>
        <span>You can use the buttons in the navigation bar at the top of the page to Log Out, get back here (the dashboard),
        Or go to the landing page where you can switch between building and embarking on LearnVentures</span>
        <button className="skip-onboarding" onClick={() => this.skipOnboarding()}>Close</button>
      </div>

    } else {
      onboarding = null
    }
    return onboarding
  }

  AdventureList() {
    let list;
    if (this.props.adventures.length === 0) {
      list = <ul>
        <li>Your Adventures will display here!</li>
        <li>Try making one with the button below!</li>
      </ul>

    } else {
      list = this.props.adventures.map((adventure, index) => (
        <li key={index}>
          <Link
            className="li-adventure"
            to={{
              pathname: `/adventure/${adventure.id}`,
            }}>{adventure.title}</Link>
          <p>{adventure.count ? `This node has been visited ${adventure.count} times` : ""} </p>
        </li>
      ))
    }
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="dashboardOnboarding arrowBox_Top">
        <span>Welcome to LearnVenture! Let's start by creating a new LearnVenture</span>
        <span>If you'd like help learning how to use this site, click "Create LearnVenture" above</span>
        <span>You can use the buttons in the navigation bar at the top of the page to Log Out, get back here (the dashboard),
        Or go to the landing page where you can switch between building and embarking on LearnVentures</span>
        <button className="skip-onboarding" onClick={() => this.skipOnboarding()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
    return (
      <div className="dashboard">
        <ul className="adventures-list" id="adventures">
          {list}
        </ul>
        <button className="create-adventure" onClick={() => this.props.history.push('/adventure')}>Create new Adventure</button>
        {onboarding}
      </div>
    );
  }

  render() {
    if (this.props.loading) {
      return <div className="loading">loading...</div>;
    }
    return (
      this.AdventureList()
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    adventures: state.adventure.adventures,
    onboarding: state.auth.onboarding
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
