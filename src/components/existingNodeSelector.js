import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { toggleChildType, stageChildNode} from '../actions/nodes'

export class ExistingNodeSelector extends React.Component {

  stageSelectedChildNode(index) {
    let node = this.props.currentAdventure.nodes[index];
    this.props.dispatch(stageChildNode(node))

  }

  linkNodes() {
    
  }

  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }

  render() {
    let parentAnswer;
    if (this.props.parentInt === 1) {
      parentAnswer = this.props.currentNode.answerA
    }
    if (this.props.parentInt === 2) {
      parentAnswer = this.props.currentNode.answerB
    }
    if (this.props.parentInt === 3) {
      parentAnswer = this.props.currentNode.answerC
    }
    if (this.props.parentInt === 4) {
      parentAnswer = this.props.currentNode.answerD
    }


    // adds index to node object to be used after filter 
    const nodesWithIndexArray = this.props.currentAdventure.nodes.map((node, index) => {
      const nodeWithIndex = { ...node, index }
      return nodeWithIndex;
    });

    // filters out current node to avoid a node answer pointing to itself
    const currentNodeRemoved = nodesWithIndexArray.filter(node =>
      node.id !== this.props.currentNode.id
    )

    // generates JSX of options with values that point to index of itself in currentAdventure.nodes
    const options = currentNodeRemoved.map((node) =>
      <option key={node.id} value={node.index}>{node.question}</option>);


    return (
      <div>
        <h3>Use Existing Node as Child</h3>
        <h4>answer that points to this node: {parentAnswer}</h4>
        <button onClick={() => this.toggleNewOrExistingNodeForm()}>Create New Node Instead</button>
        {/* TODO : VVV bad */}
        <p></p>
        <select className="nodeSelect"
          label="Select an existing node as a child"
          name="nodeSelect"
          options={options}
          onChange={e => this.stageSelectedChildNode(e.target.value)}>{options}</select>
        <button onClick={() => this.linkNodes()}>Create Connection</button>

      </div>


    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    parentInt: state.node.parentInt,
    loading: state.adventure.loading,
    currentNode: state.node.currentNode,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
  };
};

export default requiresLogin()(connect(mapStateToProps)(ExistingNodeSelector));
