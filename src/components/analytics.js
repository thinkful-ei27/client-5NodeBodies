

import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Analytics extends React.Component {

  render() {
    let finishCount = 0;
    const dataArray = this.props.currentAdventure.nodes.map(node => {
      if (node.ending === true) {
        finishCount += node.count;
      }
      return (<li>
        <h4>{node.title ? node.title : node.question}</h4>
        <p>This nodes total number of visits by all users: <span>{node.count}</span></p>
      </li>)
    })

    return (
      <div>
        <p>Adventure Start Count:
         {this.props.currentAdventure.count}
        </p>
        <p>Adventure Completion Count:
         {finishCount}
        </p>
        <h3> Number of visits per Node</h3>
        <ul>
          {dataArray}
        </ul>
        <p>
          Way to build an awesome adventure, <span>{this.props.name}</span>!
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    loading: state.adventure.loading,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Analytics));