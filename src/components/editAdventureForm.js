import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import { url } from 'redux-form-validators'
import Input from "./input";
import TextArea from "./textarea";
import { editAdventure, toggleAdventureEditing } from '../actions/createAdventure';
import { required, nonEmpty, isTrimmedPassword } from "../utils/validators";
import { connect } from 'react-redux';
import { Checkbox, Form } from 'semantic-ui-react';
import { toggleOnboarding } from '../actions/auth'

class EditAdventureForm extends React.Component {
  renderCheckBox = ({ input, label }) => {
    return (
      <Form.Field>
        <Checkbox
          autoFocus={true}
          label={label}
          checked={input.value ? true : false}
          onChange={(e, { checked }) => {
            input.onChange(checked)
          }
          }
        />
      </Form.Field>
    );
  };

  toggleAdventureEditForm() {
    return this.props.dispatch(toggleAdventureEditing())
  }

  onSubmit(values) {
    let { title,
      startContent,
      startVideoURL,
      password,
      removePassword } = values;
    console.log(password);
    let adventure = {
      title,
      startContent,
      startVideoURL,
      password,
      removePassword
    };
    return this.props.dispatch(editAdventure(adventure))
      .then(() => this.toggleAdventureEditForm())
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
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="narrowOnboarding arrowBox_Top onboarding">
        <span>This page will help you create the start of your LearnVenture. Use the form above to add a
        <strong> Title</strong>, an<strong> Introduction</strong> setting the stage, an <em>optional</em>
          <strong> YouTube URL</strong> with relevant content, and an <em>optional</em>
          <strong> Password</strong> for potential learners to access your LearnVenture. Click cancel to undo
          any changes and go back to your LearnVenture info.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
    return (<div>
      <div className="form-field">
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {error}
          <Field
            className="title input-field"
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
            className="videoURL input-field"
            label="Opening video URL(optional)"
            ariaLabel="Opening video URL(optional)"
            placeholder="https://www.youtube.com/embed/dHSQAEam2yc"
            name="startVideoURL"
            component={Input}
            // validate={url({ protocols: ['http', 'https'] })}
            type="text" />
          <Field className="textContent"
            label="Optional Password:"
            ariaLabel="Temporary"
            name="password"
            component={Input}
            placeholder="Not Required"
            type="text"
            validate={[isTrimmedPassword]} />
          <Field
            className="removePassword"
            name="removePassword"
            label="Remove Password"
            component={this.renderCheckBox}
            type="checkbox" />
          <button type="submit">Update Adventure</button>
          <button onClick={() => this.toggleAdventureEditForm()}>Cancel</button>
          {onboarding}
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    adventureId: state.adventure.currentAdventure.id,
    initialValues: Object.assign({}, state.adventure.currentAdventure),
    isEditing: state.node.isEditing,
    isDeleting: state.node.isDeleting,
    onboarding: state.auth.onboarding
  };
};



export default connect(mapStateToProps)(reduxForm({
  form: 'Adventure',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(EditAdventureForm));