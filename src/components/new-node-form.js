import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import TextArea from "./textarea";
import { createNode, toggleEnding, setCurrentNode, toggleChildType } from '../actions/nodes';
import { required, nonEmpty } from "../utils/validators";
import { Checkbox, Form } from 'semantic-ui-react';




class NewNodeForm extends React.Component {
  renderCheckBox = ({ input, label }) => {
    return (
      <Form.Field>
        <Checkbox
          autoFocus={true}
          label={label}
          checked={input.value ? true : false}
          onChange={(e, { checked }) => {
            input.onChange(checked)
            this.toggleIsEnding()
          }
          }
        />
      </Form.Field>
    );
  };
  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }

  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    let {title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let newNode = {
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
      ending,
      title,
    };
    return this.props.dispatch(createNode(newNode))
      .then(_res => {
        console.log(_res)
      })
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
            className="textContent"
            label="Scenario Description"
            name="textContent"
            component={TextArea}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="question"
            label="New Question"
            name="question"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer A"
            label="Answer A"
            name="answerA"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer B"
            placeholder="Optional"
            label="Answer B"
            name="answerB"
            component={Input}
            type="text"
          />
          <Field
            className="answer C"
            placeholder="Optional"
            label="Answer C"
            name='answerC'
            component={Input}
            type="text"
          />
          <Field
            className="answer D"
            placeholder="Optional"
            label="Answer D"
            name="answerD"
            component={Input}
            type="text"
          />
        </div>
      )
    }

    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h3>Add A New Child Node</h3>
        <h4>answer that points to this node: {parentAnswer}</h4>
        <button
          onClick={() => this.toggleNewOrExistingNodeForm()}>
          Use existing node
         </button>
        {error}
        <Field
          className="ending"
          name="ending"
          label="Is this an Ending?"
          component={this.renderCheckBox}
          type="checkbox" />
          <Field
            className="title"
            label="New Title"
            name="title"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
        <Field
          className="videoURL"
          label="Video URL (optional)"
          placeholder="http://(videoURL)"
          name="videoURL"
          component={Input}
          type="text" />
        {questions}

        <button>Add node to adventure</button>
      </form>)
  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
    isEnding: state.node.isEnding
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('NewNode'/*, Object.keys(errors)[0]*/
    ))
})(NewNodeForm));