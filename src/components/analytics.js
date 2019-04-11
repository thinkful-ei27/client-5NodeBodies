

import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './requires-login';

export class Analytics extends React.Component {

  render() {
    let finishCount = 0;
    const dataArray = this.props.currentAdventure.nodes.map(node => {
      if (node.ending === true) {
        finishCount += node.count;
      }
      return (<li>
        <h4>{node.title ? node.title : node.question}</h4>
        <p>This Checkpoint has been visited a total <span>{node.count}</span> times by all users.</p>
      </li>)
    })

    return (
      <div>
        <p>LearnVentures Start Count:
         {this.props.currentAdventure.count}
        </p>
        <p>LearnVentures Completion Count:
         {finishCount}
        </p>
        <h3> Number of visits per Checkpoint</h3>
        <ul>
          {dataArray}
        </ul>
        <p>
          Way to build an awesome LearnVenture, <span>{this.props.name}</span>!
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

export default RequiresLogin()(connect(mapStateToProps)(Analytics));
