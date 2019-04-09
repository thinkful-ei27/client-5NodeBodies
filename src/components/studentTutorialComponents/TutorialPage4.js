import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import {studentEndTutorial, studentPreviousTutorial} from '../../actions/student.js'

class TutorialPage4 extends React.Component {


    handlePreviousClick(){
        console.log('page4 handlePreviousClick ran');
        this.props.dispatch(studentPreviousTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick(){
        console.log('page4 handleQuitClick ran');
        this.props.dispatch(studentEndTutorial());
    }


    render(){
        const imgSrc4 = require('../../images/tutorialImage4.png');
        return(
            <div className="tutorialBox">
                <img className="bigPicture" src={imgSrc4} alt="The beginning of a LearnVenture!"/>
                <p>Click Embark to start your LearnVenture! Have fun!</p>
                <button onClick={e => {this.handlePreviousClick()}}>Previous Tutorial Page</button>
                <button onClick={e => {this.handleQuitClick()}}>Quit Tutorial</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber : state.student.tutorialPage
})

export default connect(mapStateToProps)(TutorialPage4);