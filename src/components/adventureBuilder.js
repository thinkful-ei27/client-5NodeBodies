import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NewNodeForm from './new-node-form';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../actions/createAdventure'
import { setCurrentNode } from '../actions/nodes'
import Sidebar from './sidebar';

export class AdventureBuilder extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    // clear new node form (parent int)
  }

  changeCurrentNode(index) {
    let node = this.props.currentAdventure.nodes[index];
    this.props.dispatch(setCurrentNode(node))
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
    const options = this.props.currentAdventure.nodes.map((node, index) =>
      <option key={node.id} value={index}>{node.question}</option>);
    return (
      <div className="row">
        <div className="col-6">
          <Sidebar />
        </div>
        <div className="col-6 with-border top-margin">
          <select className="node-select top-margin"
            label="Current Question"
            name="nodeSelect"
            options={options}
            onChange={e => this.changeCurrentNode(e.target.value)}>{options}</select>
          <CurrentNodeBrancher />
          {nodeForm}
        </div>
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureBuilder));
