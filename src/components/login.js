import React from 'react';
import { Form, Field, reduxForm, focus } from 'redux-form';
import { loginUser } from '../actions/auth';

class LoginForm extends React.Component {
  onSubmit(values) {
    let { password, username } = values;
    let user = { password, username };
    console.log(user);
    return this.props.dispatch(loginUser(user))
      .then(() => this.props.dispatch.history.push('/dashboard'));
  }
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <div>This is the Login Form</div>
        <Field
          className="username"
          name="username"
          component="input"
          type="text" />
        <Field
          className="password"
          name="password"
          component="input"
          type="password" />
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