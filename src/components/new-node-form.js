import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import { createAdventure } from '../actions/createAdventure';
import { required, nonEmpty } from "../utils/validators";

class NewNodeForm extends React.Component{
  onSubmit(values){
   let {title, startContent, question} = values;
   let adventure = {title, startContent, question};
   console.log("adventure Pre-post is: ", adventure);
   console.log("Error is: ", this.props.error);
   return this.props.dispatch(createAdventure(adventure));
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
    return (
    <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <div>add new Child node</div>
      {error}
{/* TODO placeholder for existing node dropdown */}
      <Field
        className="videoURL"
        label="http://(videoURL)"
        name="videoURL"
        component={Input}
        type="text" />
      <div>Question for new node</div>
      <Field
        className="question"
        label="what is the meaning of life?"
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

export default reduxForm({
  form: 'NewNode',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(NewNodeForm);