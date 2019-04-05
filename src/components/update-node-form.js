import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import TextArea from "./textarea";
import { deleteNode } from '../actions/nodes';
import { required, nonEmpty } from "../utils/validators";
import {
  updateNode,
  updateNodeClicked,
  toggleNodeDeleting,
  toggleEnding,
  setCurrentNode
} from '../actions/nodes'
import { Checkbox, Form } from 'semantic-ui-react';

class UpdateNodeForm extends React.Component {
  componentDidMount() {
    const currentNodeEndingValue = this.props.currentNode.ending;
    const stateIsEndingValue = this.props.isEnding;
    if(currentNodeEndingValue !== stateIsEndingValue){
      this.toggleIsEnding()
    }
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
  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNodeDeleting() {
    console.log('deletingtoggle clicked')
    return this.props.dispatch(toggleNodeDeleting())
  }

  onClickDelete() {
    let nodeId = this.props.currentNodeId;
    let adId = this.props.adventureId;
    return this.props.dispatch(deleteNode(adId, nodeId))
      .then(() => {
        let head = this.props.nodes[0]
        this.toggleNodeDeleting()
        this.props.dispatch(updateNodeClicked())
        this.props.dispatch(setCurrentNode(head))

      })
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
    this.props.dispatch(updateNodeClicked())
    this.props.dispatch(setCurrentNode(newNode))
  }
  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
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
            label="New Question"
            name="question"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer A input-field"
            label="Answer A"
            name="answerA"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer B input-field"
            label="Answer B"
            name="answerB"
            component={Input}
            type="text"
          />
          <Field
            className="answer C input-field"
            label="Answer C"
            name='answerC'
            component={Input}
            type="text"
          />
          <Field
            className="answer D input-field"
            label="Answer D"
            name="answerD"
            component={Input}
            type="text"
          />
        </div>
      )
    }

    // if ending is true... change form to only have a description section
    if (this.props.isDeleting) {
      return (
        <div className="confirm-delete-node">
          <h3>Are you sure you want to delete this Node?</h3>
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
    } else
      return (
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <h2>This Node: {
            this.props.currentNode.title ?
              this.props.currentNode.title :
              this.props.currentNode.question}</h2>
          <h4>answer that points to this node: {parentAnswer}</h4>
          {error}
          <Field
            className="ending"
            name="ending"
            label="Is this an Ending?"
            component={this.renderCheckBox}
            type="checkbox" />
          <Field
            className="title input-field"
            label="New Title"
            name="title"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="videoURL input-field"
            label="Video URL (optional)"
            placeholder="http://(videoURL)"
            name="videoURL"
            component={Input}
            type="text" />
          {questions}
          <button type="submit">Update Node</button>
          <button onClick={() => updateNodeClicked()}>Cancel</button>
          <button className="delete-node-toggle" onClick={() => this.toggleNodeDeleting()}>Delete Node</button>
        </form>)
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
    isDeleting: state.node.isDeleting
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateNodeForm));