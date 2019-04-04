import React from 'react';
import {  Link } from 'react-router-dom';

export default class Home extends React.Component {
  render(){
    return(
      <div>
        <Link to="/login">
        <button
          className="home-button on-left"
          type="button"
        >Teachers</button>
        </Link>
        <Link to="/studentLanding">
          <button
            className="home-button on-left on-right"
            type="button"
          >Students</button>
        </Link>
      </div>
    )
  }
}