import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import {studentEndTutorial, studentNextTutorial, studentPreviousTutorial} from '../../actions/student.js'

class TutorialPage2 extends React.Component {

    handlePreviousClick(){
        console.log('page2 handlePreviousClick ran');
        this.props.dispatch(studentPreviousTutorial(this.props.tutorialPageNumber));
    }

    handleNextClick(){
        console.log('page2 handleNextClick ran');
        this.props.dispatch(studentNextTutorial(this.props.tutorialPageNumber));
    }

    handleQuitClick(){
        console.log('page2 handleQuitClick ran');
        this.props.dispatch(studentEndTutorial());
    }


    render(){
        return(
            <div>
                <p>I probably don't need to be a class! 2</p>
                <button onClick={e => {this.handlePreviousClick()}}>Previous Tutorial Page</button>
                <button onClick={e => {this.handleNextClick()}}>Next Tutorial Page</button>
                <button onClick={e => {this.handleQuitClick()}}>Quit Tutorial</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber : state.student.tutorialPage
})

export default connect(mapStateToProps)(TutorialPage2);