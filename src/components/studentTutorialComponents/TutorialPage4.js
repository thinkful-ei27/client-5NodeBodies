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
        return(
            <div>
                <p>I probably don't need to be a class! 4</p>
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