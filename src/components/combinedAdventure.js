import React from "react";
import { connect } from "react-redux";
import AdventureBuilder from "./adventureBuilder";
import GraphContainer from "./graph-container";
import UpdateNodeForm from "./update-node-form";
import { getAdventureById } from '../actions/createAdventure';
import RequiresLogin from './requires-login';

export class CombinedAdventure extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    // clear new node form (parent int)
  }
  render() {
    const adventure = this.props.currentAdventure
    if (!adventure) {
      return <div className="loading">loading...</div>;
    }
    return (
      <div className="combined-adventure" >
        <AdventureBuilder />
        <GraphContainer />
        <UpdateNodeForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentAdventure: state.adventure.currentAdventure,
});

export default RequiresLogin()(connect(mapStateToProps)(CombinedAdventure));
