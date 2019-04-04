import React from 'react';
import GraphContainer from './graph-container';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component{

  render(){
    return (<div>
      <div className="full-screen-only">
      <p>This is the sidebar!</p>
        <GraphContainer />
      </div>
      <div className="not-full-screen">
        <Link to="/GraphContainer">
          <button className="graph-button not-full-screen">Graph Button</button>
        </Link>
      </div>
    </div>)
  }
}