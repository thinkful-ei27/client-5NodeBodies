import React from 'react';
import { connect } from 'react-redux';
import {
  getStudentCurrentNode,
  restartStudentAdventure,
  getStudentAdventure
} from '../actions/student'
import { Link } from 'react-router-dom'

export class StudentDisplay extends React.Component {

  updateNode(nodeId) {
    this.props.dispatch(getStudentCurrentNode(this.props.adventure.id, nodeId))
  }

  restart(adventureId) {
    this.props.dispatch(restartStudentAdventure())
    this.props.dispatch(getStudentAdventure(adventureId))
    // this.props.dispatch(getStudentAdventure(adventureId))
  }

  register() {
    this.props.history.push("/")
  }

  render() {
    let display;
    let nodeVideo;
    let nodeText;
    let nodeQuestion;
    let answerA;
    let buttonA;
    let answerB;
    let buttonB;
    let answerC;
    let buttonC;
    let answerD;
    let buttonD;
    let ending;
    if (this.props.currentNode) {

      if (this.props.currentNode.videoURL) {
        nodeVideo = (<iframe title='node-video' width="420" height="315" src={this.props.currentNode.videoURL}></iframe>)
      }
      if (this.props.currentNode.textContent) {
        nodeText = <p>{this.props.currentNode.textContent}</p>
      }
      if (this.props.currentNode.question) {
        nodeQuestion = <p>{this.props.currentNode.question}</p>
      }
      if (this.props.currentNode.answerA) {
        answerA = <p>{this.props.currentNode.answerA}</p>
        buttonA = <button onClick={() => this.updateNode(this.props.currentNode.pointerA)}>Submit</button>
      }
      if (this.props.currentNode.answerB) {
        answerB = <p>{this.props.currentNode.answerB}</p>
        buttonB = <button onClick={() => this.updateNode(this.props.currentNode.pointerB)}>Submit</button>
      }
      if (this.props.currentNode.answerC) {
        answerC = <p>{this.props.currentNode.answerC}</p>
        buttonC = <button onClick={() => this.updateNode(this.props.currentNode.pointerC)}>Submit</button>
      }
      if (this.props.currentNode.answerD) {
        answerD = <p>{this.props.currentNode.answerD}</p>
        buttonD = <button onClick={() => this.updateNode(this.props.currentNode.pointerD)}>Submit</button>
      }
      if (!this.props.currentNode.ending) {
        display = (
          <div>
            {nodeVideo}
            {nodeText}
            {nodeQuestion}
            {answerA}
            {buttonA}
            {answerB}
            {buttonB}
            {answerC}
            {buttonC}
            {answerD}
            {buttonD}
          </div>
        )
      } else {
        display = (
          <div>
            {nodeVideo}
            {nodeText}
            <p>Congratulations! This is the end of your LearnVenture.</p>
            <button className="return-to-start" onClick={() => this.restart(this.props.adventure.id)}>Return to Start</button>
            <p>If you'd like to create your own LearnVenture, <Link to='/'>click here</Link> to create an account</p>
          </div>
        )
      }

      return (

        <div>
          {this.props.currentNode.id}
          {display}

        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.adventure.title}</h1>
          <p>Created by: {this.props.adventure.creator}</p>
          <h2>{this.props.adventure.startContent}</h2>
          <iframe title="starting-video" width="420" height="315" src={this.props.adventure.videoURL}></iframe>
          <button onClick={() => this.updateNode(this.props.adventure.head)}>Embark</button>
        </div>
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
