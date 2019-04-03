import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import Input from "./input";
import { loginUser } from '../actions/auth';
import { Link } from 'react-router-dom'
import { required, nonEmpty } from "../utils/validators";

class LoginForm extends React.Component {

  onSubmit(values) {
    let { password, username } = values;
    let user = { password, username };
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
          placeholder="Username"
          className="username"
          name="username"
          component={Input}
          type="text"
          validate={[required, nonEmpty]}
        />

        <Field
          placeholder="Password"
          className="password"
          name="password"
          component={Input}
          type="password"
          validate={[required, nonEmpty]} />
        <button className="login-button on-left">Login</button>
        <Link className="register-from-login" to="/"><button className="registration-button on-right">Registration</button></Link>
      </Form>)
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('login'/*, Object.keys(errors)[0]*/
    ))
})(LoginForm);