import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import { studentEndTutorial, studentNextTutorial } from '../../actions/student.js'

export class TutorialPage1 extends React.Component {

    handleNextClick() {
        this.props.dispatch(studentNextTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick() {
        this.props.dispatch(studentEndTutorial());
    }

    render() {
        const imgSrc1 = require('../../images/tutorialImage1.png');
        return (
            <div className="tutorialBox">
                <img src={imgSrc1} alt="Student Landing Page containing a LearnVenture ID input and password"></img>
                <p>If a teacher gave you a LearnVenture ID, please put it in the first white input box (with the numbers and letters)</p>
                <p>If a teacher gave you a password, you may put it in the second white input box below the first one</p>
                <p>Then click "Start LearnVenture!" to do just that</p>
                <button onClick={e => { this.handleNextClick() }}>Next</button>
                <button onClick={e => { this.handleQuitClick() }}>Close</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber: state.student.tutorialPage,
    tutorial: state.student.tutorial
})

export default connect(mapStateToProps)(TutorialPage1);