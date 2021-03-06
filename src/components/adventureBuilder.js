import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './requires-login';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../actions/createAdventure'
import { setCurrentNode, toggleUpdateForm } from '../actions/nodes'
import GraphContainer from './graph-container'
import ExistingNodeSelector from './existingNodeSelector';


export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    if (this.props.showUpdate === true) {
      this.props.dispatch(toggleUpdateForm())
    }
  }

  componentWillMount() {
    if (!this.props.currentAdventure) {
      const { id } = this.props.match.params;
      this.props.dispatch(getAdventureById(id))
    }
    else if (!this.props.currentAdventure.head) {
      this.props.history.push('/adventure/headnode')
    }

  }

  changeCurrentNode(value) {
    let node = this.props.currentAdventure.nodes.find(node => node.id === value);
    this.props.dispatch(setCurrentNode(node))
  }

  render() {
    const adventure = this.props.currentAdventure
    let nodeForm;
    if (this.props.parentInt) {
      nodeForm = <NewNodeForm autoFocus />
    }
    if (this.props.parentInt && this.props.useExistingNode) {
      nodeForm = <ExistingNodeSelector />;
    }
    if (!adventure || !this.props.currentAdventure.head) {
      return <div className="loading">loading...</div>;
    }
    // needs 'key' prop below
    const options = this.props.currentAdventure.nodes.map((node, index) =>
      <option key={index} label={node.title} value={node.id}>{node.title ? node.title : node.question}</option>);

    return (
      <div className='adventure-builder'>
        <GraphContainer />
        <select className="node-select"
          label="Current Question"
          name="nodeSelect"
          options={options}
          value={this.props.currentNode.id}
          onChange={e => this.changeCurrentNode(e.target.value)}>{options}
        </select>
        {nodeForm}
        <CurrentNodeBrancher />
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
    isDeleting: state.adventure.isDeleting,
    showUpdate: state.node.showUpdate
  };
};

export default RequiresLogin()(connect(mapStateToProps)(AdventureBuilder));