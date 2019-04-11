import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { registerUser } from '../actions/register';
import { loginUser } from '../actions/auth';
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
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
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
          className="firstName input-field"
          placeholder="First Name"
          name="firstName"
          component={Input}
          type="text" />
        <Field
          className="lastName input-field"
          placeholder="Last Name"
          name="lastName"
          component={Input}
          type="text" />
        <Field
          className="username input-field"
          placeholder="Username"
          name="username"
          component={Input}
          type="text"
          validate={[required, nonEmpty, isTrimmed]} />
        <Field
          className="password input-field"
          placeholder="Password"
          name="password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, passwordLength]} />
        <Field
          className="confirm-password input-field"
          placeholder="Confirm Password"
          name="confirm-password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, matchesPassword]} />
        <button
          type="submit"
          className="register-button on-left"
          disabled={this.props.pristine || this.props.submitting}>
          Register</button>
      </Form>)
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'registration-form',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration-form', Object.keys(errors)[0]))
})(RegisterForm));  