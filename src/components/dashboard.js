import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';



export class Dashboard extends React.Component {
  //TO-DO ADD FETCH FOR ADVENTURES HERE
  // componentDidMount() {
  //   this.props.dispatch(getData());
  // }

  AdventureList(props) {
    const adventures = this.props.adventures.map(adventure, index) => (
      <li key={index}>
        <Link
          className="li-adventure"
          to={{
            pathname: `/adventures/${adventure.id}`,
          }}>{adventure.name}</Link>
      </li>
    )

    return (
      <div className="dashboard">
        <ul className="adventures-list" id="adventures">
          {adventures}
        </ul>
      </div>
    );
  }

  render() {
    return (
      this.AdventureList(this.props)
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.login;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.login.currentUser.username,
    name: `${currentUser.name}`,
    // adventures: adventures
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
