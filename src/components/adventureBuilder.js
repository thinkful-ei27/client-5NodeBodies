import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../actions/createAdventure'

export class AdventureBuilder extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id)
    this.props.dispatch(getAdventureById(id))
    // clear new node form (parent int)
  }

  checkForPointer() {


  }

  render() {
    const adventure = this.props.currentAdventure
    let nodeForm;
    if (this.props.parentInt) {
      nodeForm = <NewNodeForm />
    }
    if (!adventure) {
      return <div className="loading">loading...</div>;
    }
    return (
      <div>
        <CurrentNodeBrancher />
        {nodeForm}
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
    parentInt: state.node.parentInt,
    loading: state.adventure.loading,
   
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureBuilder));
