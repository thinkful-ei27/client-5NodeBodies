import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
// import { url } from 'redux-form-validators'
import Input from "./input";
import TextArea from "./textarea";
import { createAdventure } from '../actions/createAdventure';
import { required, nonEmpty, isTrimmedPassword } from "../utils/validators";
import { withRouter } from 'react-router-dom';
import Sidebar from "./sidebar";

class AdventureForm extends React.Component {
  onSubmit(values) {
    let { title,
      startContent,
      textContent,
      startVideoURL,
      password } = values;
      console.log(password);
    let adventure = {
      title,
      startContent,
      textContent,
      startVideoURL,
      password
    };
    return this.props.dispatch(createAdventure(adventure))
      .then(adventurez => {
        console.log("adventure is", adventurez)
        this.props.history.push(`/adventure/headnode`)
      })
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
    return (<div>
    <Sidebar />
    <div className="form-field">
      <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <div>Create a new adventure!</div>
        {error}
        <Field
          className="title"
          label="Adventure Title"
          ariaLabel="adventure title"
          placeholder="LearnVenture"
          name="title"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <Field
          className="startContent"
          label="Adventure Introduction"
          ariaLabel="Adventure Introduction"
          placeholder="This is the beginning of your learning quest. Let's have some fun!"
          name="startContent"
          component={TextArea}
          type="text" />
        <Field
          className="videoURL"
          label="Opening video URL(optional)"
          ariaLabel="Opening video URL(optional)"
          placeholder="https://www.youtube.com/embed/dHSQAEam2yc"
          name="startVideoURL"
          component={Input}
          // validate={url({ protocols: ['http', 'https'] })} validation in now being done on the backend
          type="text" />
        <button>New Adventure!</button>
      </Form>
    </div>
    </div>
    )
  }
}

export default withRouter(reduxForm({
  form: 'Adventure',

  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(AdventureForm));