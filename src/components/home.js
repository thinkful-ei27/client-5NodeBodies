import React from 'react';

import { Link } from 'react-router-dom';


export default class Home extends React.Component {
  render() {
    let  banner = <h2> Welcome to the LearnVenture home page!</h2>;
    return (

      <div>
        {banner}
        <div className="home-div">
          <p>Are you a teacher?<br />If so, or if you'd like to build your own LearnVenture, click the link below to login and begin.</p>
          <Link to="/login">
            <button
              className="home-button on-left wide-button"
              type="button"
            >Teachers</button>
          </Link>
        </div>
        <div className="home-div">
          <p>Are you a student?<br />If so, or if you'd like to explore public LearnVentures, click the link below to embark.</p>
          <Link to="/studentLanding">
            <button
              className="home-button on-left on-right wide-button"
              type="button"
            >Students</button>
          </Link>
        </div>
      </div>

    )
  }
}