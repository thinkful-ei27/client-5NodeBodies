import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';


export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }

  defineParentPointerForNewNode(value) {
    const parentReferenceObj = {
      parentInt: value,
      nodeId: this.props.currentNode.id
    }
    return this.props.dispatch(nodeFormWithPointer(parentReferenceObj))
  }
  render() {
    return (
      <div className="parentForm">
        <h2>current Node</h2>
        <h3 className="question">{this.props.currentNode.question}</h3>
        <p>{this.props.currentNode.leftAnswer}</p>
        <button value='1'
          onClick={() => this.defineParentPointerForNewNode(1)}>
          new Branch from answer 1
         </button>
        <p>{this.props.currentNode.rightAnswer}</p>
        <button value='2'
          onClick={() => this.defineParentPointerForNewNode(2)}>
          new Branch from answer 2
         </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  adventureId: state.adventure.adventureId,
  adventure: state.adventure.currentAdventure,
  currentNode: state.node.currentNode,
});

export default withRouter(connect(mapStateToProps)(CurrentNodeBrancher));