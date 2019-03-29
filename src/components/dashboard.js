import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { getAllAdventures } from '../actions/createAdventure'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllAdventures());
  }

  AdventureList(props) {
    if (this.props.adventures === []) {
      return (
        <ul>
          <li>Your Adventures will display here!</li>
          <li>Try making one to with the button below!</li>
        </ul>
      )
    } else {
      const adventures = this.props.adventures.map((adventure, index) => (
        <li key={index}>
          <Link
            className="li-adventure"
            to={{

              pathname: `/adventure/${adventure.id}`,

            }}>{adventure.title}</Link>
        </li>
      ))
      return (
        <div className="dashboard">
          <ul className="adventures-list" id="adventures">
            {adventures}
          </ul>
          <button className="create-adventure" onClick={() => this.props.history.push('/adventure')}>Create new Adventure</button>
        </div>
      );
    }
  }

  render() {
    if (this.props.loading) {
      return <div className="loading">loading...</div>;
    }
    return (
      this.AdventureList(this.props)
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    adventures: state.adventure.adventures
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
