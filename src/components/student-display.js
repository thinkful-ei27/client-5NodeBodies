import React from 'react';
import { connect } from 'react-redux';
import {getStudentCurrentNode} from '../actions/student'


export class StudentDisplay extends React.Component {

  updateNode(nodeId) {
    this.props.dispatch(getStudentCurrentNode(this.props.adventure[0].id, nodeId))
  }

  render() {
    let nodeVideo;
    let nodeQuestion;
    let answerA;
    let buttonA;
    let answerB;
    let buttonB;
    let answerC;
    let buttonC;
    let answerD;
    let buttonD;
    if (this.props.currentNode) {
      if (this.props.currentNode.videoURL){
        nodeVideo = (<iframe width="420" height="315" src={this.props.currentNode.videoURL}></iframe>)
      }
      if (this.props.currentNode.question){
        nodeQuestion = <p>{this.props.currentNode.question}</p>
      }
      if (this.props.currentNode.answerA){
        answerA = <p>{this.props.currentNode.answerA}</p>
        buttonA = <button onClick={() => this.updateNode(this.props.currentNode.pointerA)}>Submit</button>
      }
      if (this.props.currentNode.answerB){
        answerB = <p>{this.props.currentNode.answerB}</p>
        buttonB = <button onClick={() => this.updateNode(this.props.currentNode.pointerB)}>Submit</button>
      }
      if (this.props.currentNode.answerC){
        answerC = <p>{this.props.currentNode.answerC}</p>
        buttonC = <button onClick={() => this.updateNode(this.props.currentNode.pointerC)}>Submit</button>
      }
      if (this.props.currentNode.answerD){
        answerD = <p>{this.props.currentNode.answerD}</p>
        buttonD = <button onClick={() => this.updateNode(this.props.currentNode.pointerD)}>Submit</button>
      }
      return (
        <div>
          {this.props.currentNode.id}
          {nodeVideo}
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
      return (
        <div>
          <h1>{this.props.adventure[0].title}</h1>
          <p>Created by: {this.props.adventure[0].creator}</p>
          <h2>{this.props.adventure[0].startContent}</h2>
          <iframe width="420" height="315" src={this.props.adventure[0].startVideoURL}></iframe>
          <button onClick={() => this.updateNode(this.props.adventure[0].head)}>Embark</button>
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
    currentNode: state.student.currentNode
  };
};

export default connect(mapStateToProps)(StudentDisplay);
