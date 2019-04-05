import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';
import { toggleUpdateForm } from '../actions/nodes'
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
    this.props.dispatch(toggleUpdateForm(nodeId))
  }

  render() {
    let answerA;
    let answerB;
    let answerC;
    let answerD;
    if (this.props.currentNode.answerA) {
      answerA = (<div className='brancher-answer-container'>
        <div className='brancher-answer'><p>{this.props.currentNode.answerA}</p></div>
        <div className='brancher-pointer'>
          {this.props.currentNode.pointerA ? 'Already Accounted For!' :
          <button
            className="new-branch brancher-button"
            value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
           New Branch
         </button> 
          }
        </div>
      </div>)
    }

    if (this.props.currentNode.answerB) {
      answerB = (<div className='brancher-answer-container'>
        <div className='brancher-answer'><p>{this.props.currentNode.answerB}</p></div>
        <div className='brancher-pointer'>
          {this.props.currentNode.pointerB ? 'Already Accounted For!' :
           <button
            className="new-branch brancher-button"
            value='2'
            onClick={() => this.defineParentPointerForNewNode(2)}>
           New Branch
         </button>
          }
        </div>
      </div>)
    }
    if (this.props.currentNode.answerC) {
      answerC = (<div className='brancher-answer-container'>
        <div className='brancher-answer'>  <p>{this.props.currentNode.answerC}</p></div>
        <div className='brancher-pointer'>
          {this.props.currentNode.pointerC ? 'Already Accounted For!' :
            <button
              className="new-branch brancher-button"
              value='3'
              onClick={() => this.defineParentPointerForNewNode(3)}>
              NewBranch
    </button>}
        </div>
      </div>)
    }
    if (this.props.currentNode.answerD) {
      answerD = (<div className='brancher-answer-container'>
        <div className='brancher-answer'> <p>{this.props.currentNode.answerD}</p></div>
        <div className='brancher-pointer'>
          {this.props.currentNode.pointerD ? 'Already Accounted For!' :
           <button
            className="new-branch brancher-button"
            value='4'
            onClick={() => this.defineParentPointerForNewNode(4)}>
            NewBranch
         </button>
          }
        </div>
      </div>)
    }

    let nodeTitle;
    if (this.props.currentNode.title) {
      nodeTitle = <h2>Current Node: {this.props.currentNode.title}</h2>
    }

    if (!this.props.showUpdate) {
      return (
        <div id="current-node-brancher">
          <div className='brancher-title'>{nodeTitle}</div>
          <div className='brancher-question'>
            <h3>{this.props.currentNode.question}</h3>
          </div>
          {answerA}
          {answerB}
          {answerC}
          {answerD}
          <div className='brancher-analytics'>
            {/* TODO: add the parents that point to this node here? */}
            <button className="edit-current-node"
              onClick={() => this.editClicked()}>Edit This Node</button>
            <p>{this.props.currentNode.count ? `This node has been visited ${this.props.currentNode.count} times` : ""}</p>
          </div>

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