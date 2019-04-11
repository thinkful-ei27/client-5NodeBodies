import React from 'react';
import { connect } from 'react-redux';
import { getStudentAdventure, getStudentAll, studentStartTutorial } from '../actions/student';
import StudentDisplay from './student-display';
import AdventureSearch from './adventureSearch';
import SearchResults from './searchResults';
import Tutorial from './studentTutorialComponents/Tutorial.js'
let inputVal, error, passwordVal;

export class StudentLanding extends React.Component {

  componentDidMount() {
    this.props.dispatch(getStudentAll());
  }

  handleSubmit(e) {
    e.preventDefault();
    let adventureId = inputVal;
    this.props.dispatch(getStudentAdventure(adventureId, passwordVal));
  }

  onChange(e) {
    inputVal = e.target.value;
  }

  onChangePassword(e) {
    passwordVal = e.target.value;
  }

  handleTutorialClick() {
    console.log('handleTutorialClick ran. tutorial value is...', this.props.tutorial);
    this.props.dispatch(studentStartTutorial());
  }

  tutorialDisplay(tutorialValue) {
    if (tutorialValue) {
      return <Tutorial />
    } else {
      return <button onClick={e => { this.handleTutorialClick() }}>Start Tutorial</button>
    }
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
            </p>
            <p>If you need help, please click the button below for a tutorial</p>
            {this.tutorialDisplay(this.props.tutorial)}
            <p>
              Otherwise, please input your Exploration code below to begin your quest for learning.
            </p>
          </div>
          <div className="register-adventure">
            <form 
            className="below extra-below" onSubmit={e => this.handleSubmit(e)}>
              {error}
              <label
              for="adventureId">LearnVenture Id</label>
              <input className="adventure-input" type="text" name="adventureId" id="adventureId"
                placeholder="5c9ceaeac543f706bf407cae"
                onChange={e => this.onChange(e)}
              ></input><br />
              <label className="label" for="adventurePass">Password, if it has one </label>
              <input className="adventure-password" type="password" name="adventurePass"
                id="adventurePass"
                onChange={e => this.onChangePassword(e)}
              ></input><br />
              <button className="start-adventure on-right below" type="submit">Start LearnVenture!</button>
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
    results: state.student.results,
    tutorial: state.student.tutorial
  };
};

export default (connect(mapStateToProps)(StudentLanding));
