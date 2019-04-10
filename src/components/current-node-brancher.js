import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';
import { toggleUpdateForm } from '../actions/nodes'
import UpdateNodeForm from './update-node-form'
import { toggleOnboarding } from '../actions/auth'
import RequiresLogin from './requires-login';

export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }
  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  defineParentPointerForNewNode(parentInt) {
    return this.props.dispatch(nodeFormWithPointer(parentInt))
  }

  editClicked() {
    let nodeId = this.props.currentNode.id
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
              New Pathway
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
              New Pathway
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
              New Pathway
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
              New Pathway
         </button>
          }
        </div>
      </div>)
    }

    let nodeTitle;
    if (this.props.currentNode.title) {
      nodeTitle = <h2>Current Checkpoint: {this.props.currentNode.title}</h2>
    }

    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top arrowBox_Bottom onboarding">
        <span>This is the LearnVenture Builder. It is used to add new pathways to your LearnVenture for each
        Choice of the current Checkpoint. You can click on any of the <strong>New Pathway</strong> buttons to
                      open a from below which you will use to create a new checkpoint that stems from the choice you clicked on OR connect that choice
        to an existing checkpoint. If a choice already has a pathway, you will not be able to select <strong>New Pathway </strong>
          and the button will disappear. However, you can edit any checkpoint by setting it to the current Checkpoint. Lastly, if
        you delete the pathway that stems from any given choice, the option to connect it will appear once more.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
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
              onClick={() => this.editClicked()}>Edit This Checkpoint</button>
            <p>{this.props.currentNode.count ? `This Checkpoint has been visited ${this.props.currentNode.count} times` : ""}</p>
          </div>
          {onboarding}

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
  showUpdate: state.node.showUpdate,
  onboarding: state.auth.onboarding
});

export default withRouter(RequiresLogin()(connect(mapStateToProps)(CurrentNodeBrancher)));