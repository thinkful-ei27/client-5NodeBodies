import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import {studentEndTutorial, studentPreviousTutorial} from '../../actions/student.js'

export class TutorialPage4 extends React.Component {


    handlePreviousClick(){
        this.props.dispatch(studentPreviousTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick(){
        this.props.dispatch(studentEndTutorial());
    }


    render(){
        const imgSrc4 = require('../../images/tutorialImage4.png');
        return(
            <div className="tutorialBox">
                <img className="bigPicture" src={imgSrc4} alt="The beginning of a LearnVenture!"/>
                <p>Click Embark to start your LearnVenture! Have fun!</p>
                <button onClick={e => {this.handlePreviousClick()}}>Previous</button>
                <button onClick={e => {this.handleQuitClick()}}>Close</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber : state.student.tutorialPage
})

export default connect(mapStateToProps)(TutorialPage4);