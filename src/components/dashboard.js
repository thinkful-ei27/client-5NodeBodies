import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom'

const adventureListDummy = [
  {
    "_id": {
      "$oid": "5c9a7d1c57ac5147043a54bc"
    },
    "nodes": [
      {
        "$oid": "5c9a7d1c57ac5147043a54bb"
      }
    ],
    "title": "NewTitle",
    "startContent": "Starter Content",
    "head": {
      "$oid": "5c9a7d1c57ac5147043a54bb"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "5c9a7d3a1f4b2c1a68c6e688"
    },
    "nodes": [
      {
        "$oid": "5c9a7d3a1f4b2c1a68c6e687"
      }
    ],
    "title": "NewTitle",
    "startContent": "Starter Content",
    "head": {
      "$oid": "5c9a7d3a1f4b2c1a68c6e687"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "5c9a7d56248f9a3c18537adf"
    },
    "nodes": [
      {
        "$oid": "5c9a7d56248f9a3c18537ade"
      }
    ],
    "title": "NewTitle",
    "startContent": "Starter Content",
    "head": {
      "$oid": "5c9a7d56248f9a3c18537ade"
    },
    "__v": 0
  }
]

export class Dashboard extends React.Component {
  //TO-DO ADD FETCH FOR ADVENTURES HERE
  // componentDidMount() {
  //   this.props.dispatch(getData());
  // }

  AdventureList(props) {
    const adventures = adventureListDummy.map((adventure, index) => (
      <li key={index}>
        <Link
          className="li-adventure"
          to={{
            pathname: `/adventures/${adventure._id.$oid}`,
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

  render() {
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
    // adventures: adventures
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
