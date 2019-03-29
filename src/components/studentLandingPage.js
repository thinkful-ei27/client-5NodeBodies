import React from 'react';
import { connect } from 'react-redux';
import { getStudentAdventure } from '../actions/student'
import studentDisplay, {StudentDisplay} from './student-display'

let inputVal, error;

export class StudentLanding extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let adventureId = inputVal
    this.props.dispatch(getStudentAdventure(adventureId))
  }

  onChange(e) {
    inputVal = e.target.value
  }

  render() {
    if (this.props.adventure !== null) {
      return <StudentDisplay />
    } else {
      if (this.props.loading) {
        return <div className="loading">loading...</div>;
      }
      if (this.props.error) {
        error = <div className="form-error">{this.props.error.message}</div>;
      }
      return (
        <div className="student-landing">
          <div className="student-instructions">
            <p>
              Hello and welcome to Education Exploration!
              Please input your Exploration code below to begin your quest for learning.
            </p>
          </div>
          <div className="register-adventure">
            <form onSubmit={e => this.handleSubmit(e)}>
              {error}
              <input className="adventure-input" type="text" name="adventureId" id="adventureId"
                placeholder="5c9ceaeac543f706bf407cae"
                onChange={e => this.onChange(e)}
              ></input>
              <button className="student-adventure-submit" type="submit">Start Adventure!</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    adventure: state.student.adventure,
    error: state.student.error,
    loading: state.student.loading
  };
};

export default (connect(mapStateToProps)(StudentLanding));
