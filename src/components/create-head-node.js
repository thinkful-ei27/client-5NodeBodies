import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createNode, setCurrentNode } from '../actions/nodes'
import { Field, reduxForm, focus } from 'redux-form';
import TextArea from "./textarea";
import Input from "./input";
import { required, nonEmpty } from "../utils/validators";
import { toggleOnboarding } from '../actions/auth'

export class CreateHeadNode extends React.Component {

  onSubmit(values) {
    const adventureId = this.props.adventureId;
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
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>Here, we'll make the beginning checkpoint that learners will branch off from onto the various
        pathways of your LearnVenture Use the form above to add a <strong> Title</strong>, a<strong> Scenario Description </strong>
          describing a choice to make, an <em>optional</em><strong> YouTube URL</strong>, a<strong> Question </strong>
          that will force learners to make a choice, and <em>at least one</em><strong> answer</strong>. You can include more answers
        which will lead learners down different pathways of your LearnVenture.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }

    return (
      <div>
        <h1>Please create a head node for your LearnVenture</h1>
        <div className="questionAndAnswers">
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <Field
              className="textContent"
              label="Scenario Description"
              name="textContent"
              component={TextArea}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="title input-field"
              label="Title: "
              name="title"
              component={Input}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="videoURL input-field"
              label="video URL :"
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
              label="Answer A"
              name="answerA"
              component={Input}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="answer B input-field"
              placeholder="Optional"
              label="Answer B"
              name="answerB"
              component={Input}
              type="text"
            />
            <Field
              className="answer C input-field"
              placeholder="Optional"
              label="Answer C"
              name='answerC'
              component={Input}
              type="text"
            />
            <Field
              className="answer D input-field"
              placeholder="Optional"
              label="Answer D"
              name="answerD"
              component={Input}
              type="text"
            />
            <button>New Node!</button>
            {onboarding}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  adventureId: state.adventure.currentAdventure.id,
  onboarding: state.auth.onboarding
});

export default connect(mapStateToProps)(reduxForm({
  form: 'CreateHeadNode',

  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(CreateHeadNode));