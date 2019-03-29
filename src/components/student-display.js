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
    let leftAnswer;
    let leftButton;
    let rightAnswer;
    let rightButton;
    if (this.props.currentNode) {
      if (this.props.currentNode.videoURL){
        nodeVideo = (<iframe width="420" height="315" src={this.props.currentNode.videoURL}></iframe>)
      }
      if (this.props.currentNode.question){
        nodeQuestion = <p>{this.props.currentNode.question}</p>
      }
      if (this.props.currentNode.leftAnswer){
        leftAnswer = <p>{this.props.currentNode.leftAnswer}</p>
        leftButton = <button onClick={() => this.updateNode(this.props.currentNode.leftPointer)}>Submit</button>
      }
      if (this.props.currentNode.rightAnswer){
        rightAnswer = <p>{this.props.currentNode.rightAnswer}</p>
        rightButton = <button onClick={() => this.updateNode(this.props.currentNode.rightPointer)}>Submit</button>
      }
      return (
        <div>
          {this.props.currentNode.id}
          {nodeVideo}
          {nodeQuestion}
          {leftAnswer}
          {leftButton}
          {rightAnswer}
          {rightButton}
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.adventure[0].title}</h1>
          <p>Created by: {this.props.adventure[0].creator}</p>
          <h2>{this.props.adventure[0].startContent}</h2>
          <iframe width="420" height="315" src={this.props.adventure[0].videoURL}></iframe>
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
