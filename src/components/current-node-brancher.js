import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';
import { updateNodeClicked } from '../actions/nodes'
// import { updateCurrentNode } from '../actions/createAdventure'
import UpdateNodeForm from './update-node-form'

export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }

  defineParentPointerForNewNode(parentInt) {
    return this.props.dispatch(nodeFormWithPointer(parentInt))
  }

  editClicked() {
    let nodeId = this.props.currentNode.id
    // this.props.dispatch(updateCurrentNode(nodeId))
    this.props.dispatch(updateNodeClicked(nodeId))
  }

  render() {
    if (!this.props.showUpdate) {
      return (
        <div className="parentForm">
          <h2>Current Node</h2>
          <button className="edit-current-node"
            onClick={() => this.editClicked()}>Edit Current Node</button>
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
    } else {
      return (
        <UpdateNodeForm />
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  adventureId: state.adventure.adventureId,
  adventure: state.adventure.currentAdventure,
  currentNode: state.node.currentNode,
  showUpdate: state.node.showUpdate
});

export default withRouter(connect(mapStateToProps)(CurrentNodeBrancher));