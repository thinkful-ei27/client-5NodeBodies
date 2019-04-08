import React from 'react';
import { connect } from 'react-redux';
import { toggleOnboarding } from '../actions/auth'

export class Footer extends React.Component {

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding)
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <footer className="footer">
          <button className="help-button" onClick={() => this.toggleOnboardingClick()}>Need Help?</button>
          <span>Created by 5NodeBodies © 2019. <a href="https://github.com/thinkful-ei27/client-5NodeBodies" target="_blank">Click here</a> for more information.</span>
        </footer>
      )
    } else return (
      <footer className="footer">
        <span>Created by 5NodeBodies © 2019. <a href="https://github.com/thinkful-ei27/client-5NodeBodies" target="_blank">Click here</a> for more information.</span>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  onboarding: state.auth.onboarding,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Footer);
