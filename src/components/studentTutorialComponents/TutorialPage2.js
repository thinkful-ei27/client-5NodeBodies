import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import { studentEndTutorial, studentNextTutorial, studentPreviousTutorial } from '../../actions/student.js'

export class TutorialPage2 extends React.Component {

    handlePreviousClick() {
        this.props.dispatch(studentPreviousTutorial(this.props.tutorialPageNumber));
    }

    handleNextClick() {
        this.props.dispatch(studentNextTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick() {
        this.props.dispatch(studentEndTutorial());
    }


    render() {
        const imgSrc2 = require('../../images/tutorialImage2.png');
        return (
            <div className='tutorialBox'>
                <img src={imgSrc2} alt="Student Landing Page containing the search function"></img>
                <p>Below the "Start LearnVenture!" button is the search bar</p>
                <p>Type in a title of a LearnVenture in the white input box</p>
                <p>Press Enter and view the matching LearnVentures below</p>
                <button onClick={e => { this.handlePreviousClick() }}>Previous</button>
                <button onClick={e => { this.handleNextClick() }}>Next</button>
                <button onClick={e => { this.handleQuitClick() }}>Close</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber: state.student.tutorialPage
})

export default connect(mapStateToProps)(TutorialPage2);