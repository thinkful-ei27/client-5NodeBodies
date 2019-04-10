import React from 'react';
// import { Link } from 'react-router-dom';

export default class WrongTurn extends React.Component {

  render() {

    return (
      <div className="wrong-turn">
        <h2>Oops! Looks like you took a wrong turn.</h2>
        <button className="go-home" onClick={() => this.props.history.push('/dashboard')}>Go Home</button>
      </div>
    );
  }
}

