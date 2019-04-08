import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import {studentEndTutorial, studentNextTutorial} from '../../actions/student.js'

class TutorialPage1 extends React.Component {

    handleNextClick(){
        console.log('page1 handleNextClick ran');
        this.props.dispatch(studentNextTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick(){
        console.log('page1 handleQuitClick ran');
        this.props.dispatch(studentEndTutorial());
    }

    render(){
        const imgSrc1 = require('../../images/tutorialImage1.png');
        return(
            <div className="tutorialBox">
                <button onClick={e => {this.handleNextClick()}}>Next Tutorial Page</button>
                <button onClick={e => {this.handleQuitClick()}}>Quit Tutorial</button>
                <img src={imgSrc1} alt="Student Landing Page containing an LearnVenture ID input and search functions"></img>
                <p>If a teacher* gave you a LearnVenture ID, please put it in the first white input box (with all the numbers and letters)</p>
                <p>If a teacher gave you a password, you may put it in the second white input box below the first one</p>
                <p>Finally, the last white input box allows you to search our database for a LearnVenture! We will check your input with the titles of our stored LearnVentures</p>
                <button onClick={e => {this.handleNextClick()}}>Next Tutorial Page</button>
                <button onClick={e => {this.handleQuitClick()}}>Quit Tutorial</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber : state.student.tutorialPage,
    tutorial: state.student.tutorial
})

export default connect(mapStateToProps)(TutorialPage1);