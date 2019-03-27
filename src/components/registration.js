import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import {registerUser} from '../actions/register';

class RegisterForm extends React.Component{
  onSubmit(values){
   let {password, username, firstName, lastName} = values;
   let user = {password, username, firstName, lastName};
   return this.dispatch(registerUser(user));
  }
  render() {
    return (
    <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <div>This is the registration form!</div>
      <Field
        className="firstName"
        placeholder="First Name"
        name="firstName"
        component="input"
        type="text" />
      <Field
        className="lastName"
        placeholder="Last Name"
        name="lastName"
        component="input"
        type="text" />
      <Field
        className="username"
        placeholder="Username"
        name="username"
        component="input"
        type="text" />
      <Field
        className="password"
        placeholder="Password"
        name="password"
        component="input"
        type="password" />
      <button>Register</button>
    </Form>)
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration'/*, Object.keys(errors)[0]*/
    ))})(RegisterForm);