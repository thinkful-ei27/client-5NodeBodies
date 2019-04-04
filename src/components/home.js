import React from 'react';

import {  Link } from 'react-router-dom';


export default class Home extends React.Component {
  render(){
    return(

     <p> This is the home page!</p>

      <div>
        <p>Are you a teacher?</p>
        <Link to="/login">
        <button
          className="home-button on-left"
          type="button"
        >Teachers</button>
        </Link>
        <p>Are you a student?</p>
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