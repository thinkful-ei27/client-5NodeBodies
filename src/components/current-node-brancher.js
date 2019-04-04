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
    let answerB;
    let answerC;
    let answerD;
    if (this.props.currentNode.answerB) {
      answerB = (<div><p>{this.props.currentNode.answerB}</p>
        <button
          className="new-branch below"
          value='2'
          onClick={() => this.defineParentPointerForNewNode(2)}>
          new Branch from answer B
       </button>
      </div>)
    }
    if (this.props.currentNode.answerC) {
      answerC = (<div>
        <p>{this.props.currentNode.answerC}</p>
        <button
          className="new-branch below"
          value='3'
          onClick={() => this.defineParentPointerForNewNode(3)}>
          Branch from answer C
         </button>
      </div>)
    }
    if (this.props.currentNode.answerD) {
      answerD = (<div>
        <p>{this.props.currentNode.answerD}</p>
        <button
          className="new-branch below"
          value='4'
          onClick={() => this.defineParentPointerForNewNode(4)}>
          Branch from answer D
         </button>
      </div>)
    }

    if (!this.props.showUpdate) {
      return (
        <div className="parentForm">
          <h2>Current Question</h2>
          <button className="edit-current-node"
            onClick={() => this.editClicked()}>Edit Current Node</button>
          <p>{this.props.currentNode.count ? `This node has been visited ${this.props.currentNode.count} times` : ""}</p>
          <h3 className="question">{this.props.currentNode.question}</h3>
          <p>{this.props.currentNode.answerA}</p>
          <button
            className="new-branch below"
            value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
            new Branch from answer A
         </button>
          {answerB}
          {answerC}
          {answerD}
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