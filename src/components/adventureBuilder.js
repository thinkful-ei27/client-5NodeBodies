import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById, toggleAdventureDeleting, deleteAdventure } from '../actions/createAdventure'
import { setCurrentNode } from '../actions/nodes'
import GraphContainer from './graph-container'
import ExistingNodeSelector from './existingNodeSelector';
import Sidebar from './sidebar';

export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    // clear new node form (parent int)
  }

  changeCurrentNode(value) {
    let node = this.props.currentAdventure.nodes.find(node => node.id === value);
    this.props.dispatch(setCurrentNode(node))
  }

  displayAdventureDeleting() {
    return this.props.dispatch(toggleAdventureDeleting())
  }

  onClickDelete() {
    let adId = this.props.currentAdventure.id;
    return this.props.dispatch(deleteAdventure(adId))
      .then(() => {
        this.props.dispatch(toggleAdventureDeleting())
        this.props.history.push('/dashboard')

      })
  }

  setValueObject() {
    let value = {
      value: this.props.currentNode.question
    }
    console.log(value)
    return value;
  }

  render() {
    const adventure = this.props.currentAdventure
    let nodeForm;
    if (this.props.parentInt) {
      nodeForm = <NewNodeForm />
    }
    if (this.props.parentInt && this.props.useExistingNode) {
      nodeForm = <ExistingNodeSelector />;
    }
    if (!adventure) {
      return <div className="loading">loading...</div>;
    }

    const options = this.props.currentAdventure.nodes.map((node) =>
      <option label={node.question} value={node.id}>{node.question}</option>);

    return (
      <div>
        <select className="node-select"
          label="Current Question"
          name="nodeSelect"
          options={options}
          onChange={e => this.changeCurrentNode(e.target.value)}>{options}</select>
        <GraphContainer />
        <CurrentNodeBrancher />
        {nodeForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    parentInt: state.node.parentInt,
    useExistingNode: state.node.useExistingNode,
    loading: state.adventure.loading,
    currentNode: state.node.currentNode,
    isDeleting: state.adventure.isDeleting
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureBuilder));