import React from 'react';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import TextArea from "./textarea";
import { createNode } from '../actions/nodes';
import { required, nonEmpty } from "../utils/validators";
import { updateNode } from '../actions/nodes'

class UpdateNodeForm extends React.Component {
  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    const nodeId = this.props.currentNodeId
    let { question, answerA, answerB, answerC, answerD, videoURL, textContent } = values;
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
      nodeId
    };
    return this.props.dispatch(updateNode(newNode));
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

    // if ending is true... change form to only have a description section

    return (
      <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h3>add new Child node</h3>
        <h4>answer that points to this node: {parentAnswer}</h4>
        {error}
        {/* radio button to pick ending  */}

        <Field
          className="videoURL"
          label="http://(videoURL)"
          name="videoURL"
          component={Input}
          type="text" />
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
          label="Answer B"
          name="answerB"
          component={Input}
          type="text"
        />
        <Field
          className="answer C"
          label="Answer C"
          name='answerC'
          component={Input}
          type="text"
        />
        <Field
          className="answer D"
          label="Answer D"
          name="answerD"
          component={Input}
          type="text"
        />
        <button>Add node to adventure</button>
      </Form>)
  }
}

const mapStateToProps = state => {

  return {
    currentNodeId: state.adventure.currentNode[0].id,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
    currNode : state.adventure.currentNode[0],
    initialValues: Object.assign({}, state.adventure.currentNode[0]),

  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateNodeForm));