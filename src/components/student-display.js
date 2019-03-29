import React from 'react';
import { connect } from 'react-redux';
import {getStudentCurrentNode} from '../actions/student'


export class StudentDisplay extends React.Component {

  updateNode() {
    console.log("Adventure Id is:", this.props.student)
    // getStudentCurrentNode(this.props.adventure[0].id, this.props.adventure[0].head)
  }
  render() {
    if (this.props.currentNode) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Adventure Title</h1>
          <p>Created by: Me!</p>
          <h2>This is an adventure about the titanic</h2>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
          <button onClick={() => this.updateNode()}>   Next Node    </button>
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

export default (connect(mapStateToProps)(StudentDisplay));
