import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/register';
import { loginUser } from '../actions/auth';
import { Link } from 'react-router-dom'
import { required, nonEmpty, matches, length, isTrimmed } from '../utils/validators';
import Input from "./input";
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

class RegisterForm extends React.Component {

  onSubmit(values) {
    let { password, username, firstName, lastName } = values;
    let user = { password, username, firstName, lastName };
    let loginInfo = { password, username }
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(loginUser(loginInfo)))

  }
  render() {
    // let error;
    // if (this.props.error) {
    //   error = (
    //     <div className="form-error" aria-live="polite">
    //       {this.props.error}
    //     </div>
    //   );
    // }
    return (
      <Form
        className="registration-form"
        name="registration-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values))}>
        {/*error*/}
        <Field
          className="firstName"
          placeholder="First Name"
          name="firstName"
          component={Input}
          type="text" />
        <Field
          className="lastName"
          placeholder="Last Name"
          name="lastName"
          component={Input}
          type="text" />
        <Field
          className="username"
          placeholder="Username"
          name="username"
          component={Input}
          type="text"
          validate={[required, nonEmpty, isTrimmed]} />
        <Field
          className="password"
          placeholder="Password"
          name="password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, passwordLength]} />
        <Field
          className="confirm-password"
          placeholder="Confirm Password"
          name="confirm-password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, matchesPassword]} />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Register</button>
        <Link className="login-from-register" to="/login"><button>Log In Page</button></Link>
      </Form>)
  }
}

export default reduxForm({
  form: 'registration-form',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration-form'/*, Object.keys(errors)[0]*/))
})(RegisterForm);