import React from 'react';
import { connect } from 'react-redux';
import {
  getStudentCurrentNode,
  restartStudentAdventure,
  getStudentAdventure,
  getStudentCurrentNodeError
} from '../actions/student'
import { Link } from 'react-router-dom'

export class StudentDisplay extends React.Component {

  updateNode(nodeId) {
    if (!nodeId) {
      const error = {
        message: 'The creator of this LearnVenture did not specify the next checkpoint for the answer you selected. We bet you can create a better LearnVenture!'
      }
      return this.props.dispatch(getStudentCurrentNodeError(error))
    }
    this.props.dispatch(getStudentCurrentNode(this.props.adventure.id, nodeId))
  }

  restart(adventureId) {
    this.props.dispatch(restartStudentAdventure())
    this.props.dispatch(getStudentAdventure(adventureId))
  }

  register() {
    this.props.history.push("/")
  }

  render() {
    let display;
    let nodeVideo;
    let nodeText;
    let nodeQuestion;
    let buttonA;
    let buttonB;
    let buttonC;
    let buttonD;
    let errorMessage;
    if (this.props.error) {
      errorMessage = <div>
        <p className='error-message'>{this.props.error.message}
        </p>
      </div>
    }
    if (this.props.currentNode) {

      if (this.props.currentNode.videoURL) {
        let videoPlay = this.props.currentNode.videoURL;
        nodeVideo = (<iframe title='node-video' width="420" height="315" src={videoPlay}></iframe>)
      }
      if (this.props.currentNode.textContent) {
        nodeText = <p id="student-content">{this.props.currentNode.textContent}</p>
      }
      if (this.props.currentNode.question) {
        nodeQuestion = <strong><p id="student-question">{this.props.currentNode.question}</p></strong>
      }
      if (this.props.currentNode.answerA) {
        // answerA = <p>{this.props.currentNode.answerA}</p>
        buttonA = <button className="answer-button" onClick={() => this.updateNode(this.props.currentNode.pointerA)}>{this.props.currentNode.answerA}</button>
      }
      if (this.props.currentNode.answerB) {
        // answerB = <p>{this.props.currentNode.answerB}</p>
        buttonB = <button className="answer-button" onClick={() => this.updateNode(this.props.currentNode.pointerB)}>{this.props.currentNode.answerB}</button>
      }
      if (this.props.currentNode.answerC) {
        // answerC = <p>{this.props.currentNode.answerC}</p>
        buttonC = <button className="answer-button" onClick={() => this.updateNode(this.props.currentNode.pointerC)}>{this.props.currentNode.answerC}</button>
      }
      if (this.props.currentNode.answerD) {
        // answerD = <p>{this.props.currentNode.answerD}</p>
        buttonD = <button className="answer-button" onClick={() => this.updateNode(this.props.currentNode.pointerD)}>{this.props.currentNode.answerD}</button>
      }
      if (!this.props.currentNode.ending) {
        display = (
          <section>
            {nodeVideo}
            <div id="description-question-box">
              {nodeText}
              {nodeQuestion}
            </div>
            {errorMessage}
            <br />
            {/*answerA*/}
            {buttonA}
            <br />
            {/*answerB*/}
            {buttonB}
            <br />
            {/*answerC*/}
            {buttonC}
            <br />
            {/*answerD*/}
            {buttonD}
            <br />
          </section>
        )
      } else {
        display = (
          <section>
            {nodeVideo}
            <strong>{nodeText}</strong>
            <p>Congratulations! This is the end of your LearnVenture.</p>
            <button className="return-to-start" onClick={() => this.restart(this.props.adventure.id)}>Return to Start</button>
            <p><strong>If you'd like to create your own LearnVenture, <Link to='/registration'>click here</Link> to create an account</strong></p>
          </section>
        )
      }

      return (
        <div>
          {display}
        </div>
      )
    } else {
      return (
        <section>
          <h1>{this.props.adventure.title}</h1>
          <p>Created by: {this.props.adventure.creator}</p>
          <h2>{this.props.adventure.startContent}</h2>
          {errorMessage}
          <iframe title="starting-video" width="420" height="315" src={this.props.adventure.startVideoURL}></iframe><br />
          <button
            className="embark-button"
            onClick={() => this.updateNode(this.props.adventure.head)}>Embark</button>
        </section>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    adventure: state.student.adventure,
    error: state.student.error,
    loading: state.student.loading,
    currentNode: state.student.currentNode,
    results: state.student.results
  };
};

export default connect(mapStateToProps)(StudentDisplay);
