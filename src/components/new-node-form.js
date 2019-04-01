import React from 'react';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import TextArea from "./textarea";
import { createNode } from '../actions/nodes';
import { required, nonEmpty } from "../utils/validators";

class NewNodeForm extends React.Component {
  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    let { question, leftAnswer, rightAnswer, videoURL } = values;
    let newNode = {
      leftAnswer,
      rightAnswer,
      videoURL,
      question,
      parentInt,
      adventureId,
      parentId
    };
    return this.props.dispatch(createNode(newNode));
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
      parentAnswer = this.props.currentNode.leftAnswer
    }
    if (this.props.parentInt === 2) {
      parentAnswer = this.props.currentNode.rightAnswer
    }


    return (
      <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h3>add new Child node</h3>
        <h4>answer that points to this node: {parentAnswer}</h4>
        {error}

        <Field
          className="videoURL"
          label="http://(videoURL)"
          name="videoURL"
          component={Input}
          type="text" />
        <Field
          className="description"
          label="Scenario Description"
          name="description"
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
          className="leftAnswer"
          label="First Answer"
          name="leftAnswer"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <Field
          className="rightAnswer"
          label="Second Answer"
          name="rightAnswer"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <button>Add node to adventure</button>
      </Form>)
  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,

  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(NewNodeForm));