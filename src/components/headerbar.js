import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../utils/local-storage';
// import { Link } from 'react-router-dom';

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken()
  }

  render() {
    // Only render log out button if we are logged in
    let navButtons;
    if (this.props.loggedIn) {
      navButtons = <div className="nav-buttons">
        {/* TO-DO: REACT-ROUTER INSTEAD???????????????? */}
        <a className="button" href="/dashboard">
          <button className="home-button">Home</button>
        </a>
        <button type="button" onClick={() => {
          this.logOut()
        }}>Log Out</button>
      </div>
    }
    return (
      <header className="headerbar">
        <h1>This is Our App Title!</h1>
        {navButtons}
      </header>
    )
  }
}

const mapStateToProps = state => ({
<<<<<<< HEAD
  loggedIn: state.login.currentUser !== null
=======
  // loggedIn: state.auth.currentUser !== null
>>>>>>> develop
});

export default connect(mapStateToProps)(Headerbar);
