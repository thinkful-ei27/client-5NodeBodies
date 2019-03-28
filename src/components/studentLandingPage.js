import React from 'react';

export default class StudentLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ studentAdventure: event.target.value });
  }

  handleSubmit(event) {
    alert('An adventure was submitted: ' + this.state.studentAdventure);
    event.preventDefault();
  }

  render() {
    return (
      <div className="student-landing">
        <div className="student-instructions">
          <p>
            Hello and welcome to Education Exploration!
            Please input your Exploration code below to begin your quest for learning.
          </p>
        </div>
        <div className="register-adventure">
          <form onSubmit={this.handleSubmit}>
            <input className="adventure-input" type="text"
              placeholder="5c9ceaeac543f706bf407cae"
              value={this.state.studentAdventure} onChange={this.handleChange}></input>
            <button className="student-adventure-submit" type="submit">Start Adventure!</button>
          </form>

        </div>
      </div>
    );
  }
}

