import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer } from '../actions/nodes';


export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }

  defineParentPointerForNewNode(parentInt) {
    return this.props.dispatch(nodeFormWithPointer(parentInt))
  }
  render() {
    return (
      <div className="parentForm">
        <h2>Current Node</h2>
        <h3 className="question">{this.props.currentNode.question}</h3>
        <p>{this.props.currentNode.answerA}</p>
        { this.props.currentNode.pointerA
          ? <br/>
          : <button value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
            new Branch from answer A
            </button> 
        }
        <p>{this.props.currentNode.answerB}</p>
        { this.props.currentNode.pointerB
          ? <br/>
          : <button value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
            new Branch from answer A
            </button> 
        }
        <p>{this.props.currentNode.answerC}</p>
        { this.props.currentNode.pointerC
          ? <br/>
          : <button value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
            new Branch from answer A
            </button> 
        }
        <p>{this.props.currentNode.answerD}</p>
        { this.props.currentNode.pointerD
          ? <br/>
          : <button value='1'
            onClick={() => this.defineParentPointerForNewNode(1)}>
            new Branch from answer A
            </button> 
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  adventureId: state.adventure.adventureId,
  adventure: state.adventure.currentAdventure,
  currentNode: state.node.currentNode,
});

export default withRouter(connect(mapStateToProps)(CurrentNodeBrancher));