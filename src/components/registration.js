import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import {registerUser} from '../actions/register';

class RegisterForm extends React.Component{
  onSubmit(values){
   return this.dispatch(registerUser(values));
  }
  render() {
    return (
    <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <div>This is the registration form!</div>
      <Field
        className="username"
        name="userName"
        component="input"
        type="text" />
      <Field
        className="password"
        name="password"
        component="input"
        type="password" />
      <button
        type="submit"
        >Register</button>
    </Form>)
  }
}

export default reduxForm({
  form: 'registration-form',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration-form', Object.keys(errors)[0]))
})(RegisterForm);