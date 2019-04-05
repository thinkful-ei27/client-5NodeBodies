import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createNode, setCurrentNode } from '../actions/nodes'
import { Field, reduxForm, focus } from 'redux-form';
import TextArea from "./textarea";
import Input from "./input";
import { required, nonEmpty } from "../utils/validators";

export class CreateHeadNode extends React.Component {


  onSubmit(values) {
    const adventureId = this.props.adventureId;
    const nodeId = this.props.currentNodeId
    const ending = false
    let { question, answerA, answerB, answerC, answerD, videoURL, textContent } = values;
    let newNode = {
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
  render() {
    return (
      <div>
        <h1>Please create a head node for your adventure</h1>
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
              className="question"
              label="New Question"
              name="question"
              component={Input}
              type="text"
              validate={[required, nonEmpty]} />
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
              type="text"
            />
            <Field
              className="answer C"
              label="Answer C"
              name='answerC'
              component={Input}
              type="text"
            />
            <Field
              className="answer D"
              label="Answer D"
              name="answerD"
              component={Input}
              type="text"
            />
            <button>New Node!</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  adventureId: state.adventure.currentAdventure.id,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'CreateHeadNode',

  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(CreateHeadNode));