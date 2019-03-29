import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';

export class AdventureBuilder extends React.Component {

  checkForPointer() {


  }

  render() {
    let nodeForm;
    if (this.props.parentsAnswerReference) {
      nodeForm = <NewNodeForm />
    }
    if (this.props.loading) {
      return <div className="loading">loading...</div>;
    }
    return (
      <div>
        <CurrentNodeBrancher />
        {nodeForm}
        <Link to="/dashboard">
        <button className="">go to node brancher</button>
      </Link>
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
    parentsAnswerReference: state.node.parentsAnswerReference,
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureBuilder));
