import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import Input from "./input";
import { createAdventure } from '../actions/createAdventure';
import { required, nonEmpty } from "../utils/validators";
import { withRouter, Redirect, Link } from 'react-router-dom';

class AdventureForm extends React.Component {
  onSubmit(values) {
    let { title,
      startContent,
      textContent,
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      startVideoURL,
      videoURL } = values;
    let adventure = {
      title,
      startContent,
      textContent,
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      startVideoURL,
      videoURL
    };
    return this.props.dispatch(createAdventure(adventure));
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
      <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <div>Create a new adventure!</div>
        {error}
        <Field
          className="title"
          label="title"
          name="title"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <Field
          className="startContent"
          label="Intro Content"
          name="startContent"
          component={Input}
          type="text" />
        <Field
          className="videoURL"
          label="http://(videoURL)"
          name="startVideoURL"
          component={Input}
          type="text" />
        <div> You have to create your first question as well</div>
        <Field
          className="question"
          label="Whats your starting question? (the meaning of life)"
          name="question"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <Field
          className="textContent"
          label="Text Content for head Node"
          name="textContent"
          component={Input}
          type="text" />
        <Field
          className="video"
          label="Videl URL for head Node"
          name="videoURL"
          component={Input}
          type="text" />
        <Field
          className="answer A"
          label="Answer A"
          name="answerA"
          component={Input}
          type="text"
          validate={[required, nonEmpty]} />
        <Field
          className="answer B"
          label="Answer B"
          name="answerB"
          component={Input}
          type="text" />
        <Field
          className="answer C"
          label="Answer C"
          name="answerC"
          component={Input}
          type="text" />
        <Field
          className="answer D"
          label="Answer D"
          name="answerD"
          component={Input}
          type="text" />
        <button>New Adventure!</button>
      </Form>
      {/*<Link to="/adventure/adventureBuilder">
        <button className="">go to node adventure builder</button>
    </Link>*/}

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