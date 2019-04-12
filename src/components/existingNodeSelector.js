import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './requires-login';
import { toggleChildType, stageChildNode, linkNodesById } from '../actions/nodes'

export class ExistingNodeSelector extends React.Component {

  componentDidMount() {
    const currentNodeRemoved = this.filterCurrentNodeFromPotentialChildren()
    //  this dispatch blocks against staged child node being null, and if there is only one value 
    //  to select from, you cannot select it.
    this.props.dispatch(stageChildNode(currentNodeRemoved[0]))
  }

  filterCurrentNodeFromPotentialChildren() {
    // adds index to node object to be used after filter 
    const nodesWithIndexArray = this.props.currentAdventure.nodes.map((node, index) => {
      const nodeWithIndex = { ...node, index }
      return nodeWithIndex;
    });

    // filters out current node to avoid a node answer pointing to itself
    const currentNodeRemoved = nodesWithIndexArray.filter(node =>
      node.id !== this.props.currentNode.id
    )
    return currentNodeRemoved
  }


  stageSelectedChildNode(index) {
    let node = this.props.currentAdventure.nodes[index];
    this.props.dispatch(stageChildNode(node))

  }

  linkNodes() {
    let idObjectWithParentInt = {
      adventureId: this.props.currentAdventure.id,
      parentId: this.props.currentNode.id,
      childId: this.props.stagedChildNode.id,
      parentInt: this.props.parentInt,
    }
    this.props.dispatch(linkNodesById(idObjectWithParentInt))

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


    const currentNodeRemoved = this.filterCurrentNodeFromPotentialChildren()

    // generates JSX of options with values that point to index of itself in currentAdventure.nodes
    const options = currentNodeRemoved.map((node) => {
      if (node.title) {
        return <option key={node.id} label={node.title} value={node.index}>{node.question}</option>
      }
      // this else is temporary(?) until all nodes have titles
      else {
        return <option key={node.id} label={node.question} value={node.index}>{node.question}</option>
      }
    });

    return (
      <div className="form-field">
        <h3>Use Existing Checkpoint as Pathway</h3>
        <h4>Choice that points to this Checkpoint: {parentAnswer}</h4>
        <button onClick={() => this.toggleNewOrExistingNodeForm()}>Create New Checkpoint Instead</button>
        {/* TODO : VVV bad */}
        <p></p>
        <select className="node-select"
          label="Select an existing Checkpoint as the pathway"
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
    stagedChildNode: state.node.stagedChildNode
  };
};

export default RequiresLogin()(connect(mapStateToProps)(ExistingNodeSelector));
