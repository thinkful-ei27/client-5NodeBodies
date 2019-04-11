import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import {studentNextTutorial, studentPreviousTutorial, studentEndTutorial} from '../../actions/student.js'


export class TutorialPage3 extends React.Component {

    handlePreviousClick(){
        this.props.dispatch(studentPreviousTutorial(this.props.tutorialPageNumber));
    }

    handleNextClick(){
        this.props.dispatch(studentNextTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick(){
        this.props.dispatch(studentEndTutorial());
    }


    render(){
        const imgSrc3 = require('../../images/tutorialImage3.png');
        return(
            <div className="tutorialBox">
                <img className="notBigPicture" src={imgSrc3} alt="The returned LearnVentures from a search, one with password protection" />
                <p>LearnVentures are displayed below the search bar</p>
                <p>Input the password if you see a white input box</p>
                <p>Press "Click to Start" to do just that!</p>
                <button onClick={e => {this.handlePreviousClick()}}>Previous</button>
                <button onClick={e => {this.handleNextClick()}}>Next</button>
                <button onClick={e => {this.handleQuitClick()}}>Close</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber : state.student.tutorialPage
})

export default connect(mapStateToProps)(TutorialPage3);