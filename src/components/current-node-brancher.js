import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';


export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }

  defineParentPointerForNewNode(parentInt) {
    return this.props.dispatch(nodeFormWithPointer(parentInt))
  }
  render() {
    return (
      <div className="parentForm">
        <h2>Current Node</h2>
        <p>{this.props.currentNode.count ? `This node has been visited ${this.props.currentNode.count} times` : ""} </p>
        <h3 className="question">{this.props.currentNode.question}</h3>
        <p>{this.props.currentNode.answerA}</p>
        <button value='1'
          onClick={() => this.defineParentPointerForNewNode(1)}>
          new Branch from answer A
         </button>
        <p>{this.props.currentNode.answerB}</p>
        <button value='2'
          onClick={() => this.defineParentPointerForNewNode(2)}>
          new Branch from answer B
         </button>
        <p>{this.props.currentNode.answerC}</p>
        <button value='3'
          onClick={() => this.defineParentPointerForNewNode(3)}>
          new Branch from answer C
         </button>
        <p>{this.props.currentNode.answerD}</p>
        <button value='4'
          onClick={() => this.defineParentPointerForNewNode(4)}>
          new Branch from answer D
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