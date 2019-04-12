import React from 'react';
import { connect } from "react-redux";

import RequiresLogin from './requires-login';
import { createNode  } from '../actions/nodes'
import { Field, reduxForm } from 'redux-form';
import TextArea from "./textarea";
import Input from "./input";
import { required, nonEmpty } from "../utils/validators";
import { toggleOnboarding } from '../actions/auth'

export class CreateHeadNode extends React.Component {

  componentWillMount() {
    if (!this.props.currentAdventure) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(values) {
    const adventureId = this.props.currentAdventure.id;
    const nodeId = this.props.currentNodeId
    const ending = false
    let { question, answerA, answerB, answerC, answerD, videoURL, textContent, title } = values;
    let newNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      textContent,
      videoURL,
      question,
      adventureId,
      nodeId,
      ending
    };
    return this.props.dispatch(createNode(newNode))
      .then(() => {
        return this.props.history.push(`/adventure/adventurebuilder/${adventureId}`)
      })
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  render() {
    let error;
    if (this.props.nodeError) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.nodeError}
        </div>
      );
    }
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>Here, we'll make the beginning checkpoint that learners will branch off from onto the various
        pathways of your LearnVenture Use the form above to add a <strong> Title</strong>, a<strong> Scenario Description </strong>
          describing a choice to make, an <em>optional</em><strong> YouTube URL</strong> (<em>Only YouTube links work. Videos hosted
          on other sites are not supported at this time</em>), a<strong> Question </strong> that will force learners to make a choice,
          and <em>at least one</em><strong> Choices</strong>. You can include more Choices which will lead learners down different
          pathways of your LearnVenture.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }

    return (
      <div>
        <div className='form-field'>
        <h2>Please create a LearnVenture Starting Checkpoint</h2>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <div className="form-questions">

            <Field
              className="title input-field"
              label="Checkpoint Title: "
              name="title"
              component={Input}
              type="text"
            // validate={[required, nonEmpty]} 
            />
            <Field
              className="textContent"
              label="Scenario Description"
              name="textContent"
              component={TextArea}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="videoURL input-field"
              label="YouTube URL :"
              name="videoURL"
              component={Input}
              type="text" />
            <Field
              className="question input-field"
              label="New Question"
              name="question"
              component={Input}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="answer A input-field"
              label="Choice A"
              name="answerA"
              component={Input}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="answer B input-field"
              placeholder="Optional"
              label="Choice B"
              name="answerB"
              component={Input}
              type="text"
            />
            <Field
              className="answer C input-field"
              placeholder="Optional"
              label="Choice C"
              name='answerC'
              component={Input}
              type="text"
            />
            <Field
              className="answer D input-field"
              placeholder="Optional"
              label="Choice D"
              name="answerD"
              component={Input}
              type="text"
            />
          </div>
          {error}
          <button>New Checkpoint!</button>
          {onboarding}
        </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  currentAdventure:state.adventure.currentAdventure,

  onboarding: state.auth.onboarding,
  error: state.node.nodeError

});

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'CreateHeadNode',

  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(CreateHeadNode)));