import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import { loginUser } from '../actions/auth';
import { required, nonEmpty } from "../utils/validators";

export class LoginForm extends React.Component {

  onSubmit(values) {
    let { password, username } = values;
    let user = { password, username };
    return this.props.dispatch(loginUser(user))
  }

  demoLogin() {
    let user = {
      username: 'fryshake',
      password: 'password123'
    }
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
      <div>
        <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {error}
          <Field
            label="Username"
            className="username input-field on-top"
            name="username"
            component={Input}
            type="text"
            validate={[required, nonEmpty]}
          />
          <Field
            label="Password"
            className="password input-field below"
            name="password"
            component={Input}
            type="password"
            validate={[required, nonEmpty]} />
          <button className="login-button" type="submit">Login</button>
        </Form>
        <button className="demo-button" onClick={() => this.demoLogin()}>Demo Login</button>
      </div>)
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('login'/*, Object.keys(errors)[0]*/
    ))
})(LoginForm);