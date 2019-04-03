import React from 'react';
import { connect } from 'react-redux';
import { getStudentAdventure, getStudentAll } from '../actions/student';
import StudentDisplay from './student-display';
import AdventureSearch from './adventureSearch';
import SearchResults from './searchResults';
let inputVal, error;

export class StudentLanding extends React.Component {

  componentDidMount(){
      this.props.dispatch(getStudentAll());
  }

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
              <button className="start-adventure on-right" type="submit">Start Adventure!</button>
            </form>
          </div>
          <AdventureSearch />
          <SearchResults />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    adventure: state.student.adventure,
    error: state.student.error,
    loading: state.student.loading,
    results: state.student.results
  };
};

export default (connect(mapStateToProps)(StudentLanding));
