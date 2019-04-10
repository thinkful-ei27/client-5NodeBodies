import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import RequiresLogin from './requires-login';
import TextArea from "./textarea";
import { deleteNode } from '../actions/nodes';
import { required, nonEmpty } from "../utils/validators";
import {
  updateNode,
  toggleUpdateForm,
  toggleNodeDeleting,
  toggleEnding,
  setCurrentNode
} from '../actions/nodes'
import { Checkbox, Form } from 'semantic-ui-react';
import { toggleOnboarding } from '../actions/auth'


class UpdateNodeForm extends React.Component {

  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNodeDeleting() {
    console.log('deletingtoggle clicked')
    return this.props.dispatch(toggleNodeDeleting())
  }

  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  onClickDelete() {
    let nodeId = this.props.currentNodeId;
    let adId = this.props.adventureId;
    return this.props.dispatch(deleteNode(adId, nodeId))
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    const nodeId = this.props.currentNodeId
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let newNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      textContent,
      videoURL,
      question,
      parentInt,
      adventureId,
      parentId,
      nodeId,
      ending
    };
    this.props.dispatch(updateNode(newNode))
  }

  renderCheckBox = ({ input, label }) => {
    return (
      <Form.Field>
        <Checkbox
          label={label}
          checked={input.value ? true : false}
          onChange={(e, { checked }) => {
            input.onChange(checked)
            this.toggleIsEnding()
          }}
        />
      </Form.Field>
    );
  };

  render() {
    let error;
    if (this.props.nodeError) {
      error = (
        <div className="form-error" aria-live="polite">
          <p>
            {this.props.nodeError}
          </p>
        </div>
      );
    }

    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>This form is for changing the information of your current checkpoint. You can use it to change or add
        the <strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
          <strong> YouTube URL</strong>,<strong> Question</strong>, and <strong>Choices</strong>. You can also change
          a checkpoint to and ending or delete it. Click cancel to undo any changes and go back to the LearnVenture builder.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
    // Used to display which parent points to this node only
    let parentAnswer;
    if (this.props.parentInt === 1) {
      parentAnswer = this.props.currentNode.answerA
    }
    if (this.props.parentInt === 2) {
      parentAnswer = this.props.currentNode.answerB
    }
    if (this.props.parentInt === 3) {
      parentAnswer = this.props.currentNode.answerC
    }
    if (this.props.parentInt === 4) {
      parentAnswer = this.props.currentNode.answerD
    }

    // what questions variable is dependent upon whether current node being edited is 
    // an ending or not
    let questions;

    if (this.props.isEnding) {
      questions = (
        <Field
          className="textContent"
          label="Ending Description"
          name="textContent"
          component={TextArea}
          type="text"
          validate={[required, nonEmpty]} />
      )
    } else {
      questions = (
        <div className="questionAndAnswers">
          <Field
            className="textContent input-field"
            label="Scenario Description"
            name="textContent"
            component={TextArea}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="question input-field"
            label="Question"
            name="question"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer A input-field"
            label="Choice A"
            name="answerA"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer B input-field"
            placeholder="Optional"
            label="Choice B"
            name="answerB"
            component={Input}
            type="text"
          />
          <Field
            className="answer C input-field"
            placeholder="Optional"
            label="Choice C"
            name='answerC'
            component={Input}
            type="text"
          />
          <Field
            className="answer D input-field"
            placeholder="Optional"
            label="Choice D"
            name="answerD"
            component={Input}
            type="text"
          />
        </div>
      )
    }

    // renders the delete warning and button only, with a go back button
    if (this.props.isDeleting) {
      return (
        <div className="confirm-delete-node">
          <h3>Are you sure you want to delete this Checkpoint?</h3>
          {error}
          <div className="buttons">
            <button
              className="delete-it"
              type='button'
              onClick={id => this.onClickDelete(id)}
            >Delete It
            </button>
            <button
              className="keep-it"
              type='button'
              onClick={() => this.toggleNodeDeleting()}
            >Keep It
            </button>
          </div>
        </div>
      )
    }
    // render the update node form
    else
      return (
        <div className='update-form-container'>
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <h2>This Checkpoint: {
              this.props.currentNode.title ?
                this.props.currentNode.title :
                this.props.currentNode.question}</h2>
            <h4>Choice that points to this Checkpoint: {parentAnswer}</h4>

            <Field
              className="end-checkbox"
              name="ending"
              label="Is this an Ending?"
              component={this.renderCheckBox}
              type="checkbox" />
            <Field
              className="title input-field"
              label="Checkpoint Title"
              name="title"
              component={Input}
              type="text"
            // validate={[required, nonEmpty]}
            />
            <Field
              className="videoURL input-field"
              label="Video URL (optional)"
              placeholder="http://(videoURL)"
              name="videoURL"
              component={Input}
              type="text" />
            {questions}
            {error}
            <button type="submit">Update Node</button>
          </form>
          <button onClick={() => this.cancelUpdate()}>Cancel</button>
          <button className="delete-node-toggle" onClick={() => this.toggleNodeDeleting()}>Delete Checkpoint</button>
          {onboarding}
        </div>)
  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    nodes: state.adventure.currentAdventure.nodes,
    currentNodeId: state.node.currentNode.id,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
    initialValues: Object.assign({}, state.node.currentNode),
    isEnding: state.node.isEnding,
    isDeleting: state.node.isDeleting,
    onboarding: state.auth.onboarding,
    nodeError: state.node.error
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateNodeForm)));