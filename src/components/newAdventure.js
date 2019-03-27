import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import { createAdventure } from '../actions/createAdventure';

class AdventureForm extends React.Component{
  onSubmit(values){
   let {title, startContent, question} = values;
   let adventure = {title, startContent, question};
   console.log("adventure Pre-post is: ", adventure);
   return this.props.dispatch(createAdventure(adventure));
  }
  render() {
    return (
    <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <div>Create a new adventure!</div>
      <Field
        className="title"
        placeholder="title"
        name="title"
        component="input"
        type="text" />
      <Field
        className="startContent"
        placeholder="Content"
        name="startContent"
        component="input"
        type="text" />
      <div> You have to create your first question as well</div>
      <Field
        className="question"
        placeholder="what is the meaning of life?"
        name="question"
        component="input"
        type="text" />
      <button>New Adventure!</button>
    </Form>)
  }
}

export default reduxForm({
  form: 'Adventure',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(AdventureForm);