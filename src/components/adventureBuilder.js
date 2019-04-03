import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../actions/createAdventure'
import { setCurrentNode } from '../actions/nodes'
import GraphContainer from './graph-container'

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
    if (!adventure) {
      return <div className="loading">loading...</div>;
    }
    const options = this.props.currentAdventure.nodes.map((node) =>
      <option label={node.question} value={node.id}>{node.question}</option>);
    return (
      <div>
        <select className="nodeSelect"
          name="nodeSelect"
          value={this.props.currentNode.id}
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
    loading: state.adventure.loading,
    currentNode: state.node.currentNode
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureBuilder));
