import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { getAllAdventures } from '../actions/createAdventure'
import { toggleOnboarding } from '../actions/auth'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllAdventures());
    if (this.props.onboarding) {
      this.props.dispatch(toggleOnboarding())
    } else if (this.props.adventures && this.props.onboarding) {
      this.props.dispatch(toggleOnboarding())
    }
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  AdventureList() {
    let list;
    if (this.props.adventures.length === 0) {
      list = <ul>
        <li>Your LearnVentures will display here!</li>
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
          <p>{adventure.count ? `This Checkpoint has been visited ${adventure.count} times` : ""} </p>
        </li>
      ))
    }

    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>Welcome to LearnVenture! You can use the buttons in the navigation bar at the top of the page to <strong>Log Out</strong>,
        get back here (the <strong>Dashboard</strong>), Or go to the <strong>Home page</strong>, where you can switch between building and embarking on
                                  LearnVentures. If you'd like help learning how to use this site, click "Create LearnVenture" above. Or close me
      using the button below. You can turn help on and off on every page of the site to use when you need it!</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
    return (
      <div className="dashboard">
        <ul className="adventures-list" id="adventures">
          {list}
        </ul>
        <button className="create-adventure" onClick={() => this.props.history.push('/adventure')}>Create New LearnVenture</button>
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
