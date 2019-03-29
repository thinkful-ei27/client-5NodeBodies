import React from 'react';
import { connect } from 'react-redux';
import {getStudentCurrentNode} from '../actions/student'


export class StudentDisplay extends React.Component {

  updateNode() {
    this.props.dispatch(getStudentCurrentNode(this.props.adventure[0].id, this.props.adventure[0].head))
  }

  render() {
    let nodeVideo;
    let nodeQuestion;
    if (this.props.currentNode) {
      if (this.props.currentNode.videoURL){
        nodeVideo = (<iframe width="420" height="315" src={this.props.currentNode.videoURL}></iframe>)
      }
      if (this.props.currentNode.question){
        nodeQuestion = <p>{this.props.currentNode.question}</p>
      }
      return (
        <div>
          {this.props.currentNode.id}
          {nodeVideo}
          {nodeQuestion}
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.adventure.title}</h1>
          <p>Created by: {this.props.adventure.creator}</p>
          <h2>This is an adventure about the titanic</h2>
          <iframe width="420" height="315" src={this.props.adventure.videoURL}></iframe>
          <button onClick={() => this.updateNode()}>Embark</button>
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
