import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import { loginUser } from '../actions/auth';
import { required, nonEmpty } from "../utils/validators";

class LoginForm extends React.Component {

  onSubmit(values) {
    console.log(values);
    let { password, username } = values;
    let user = { password, username };
    console.log(user);
    console.log("Error is: ", this.props.error);
    return this.props.dispatch(loginUser(user))
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
        <div>This is the Login Form</div>
        {error}
        <Field
          className="username"
          name="username"
          component={Input}
          type="text"
          validate={[required, nonEmpty]}
           />
          
        <Field
          className="password"
          name="password"
          component={Input}
          type="password" 
          validate={[required, nonEmpty]}/>
        <button>Login</button>
      </Form>)
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('login'/*, Object.keys(errors)[0]*/
    ))
})(LoginForm);