import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';


export default class TutorialPage1 extends React.Component {

    

    render(){
        return(
            <div>
                <button>Previous Tutorial Page</button>
                <button>Next Tutorial Page</button>
                <button>Quit Tutorial</button>
            </div>
        )
    }
}


// const mapStateToProps = state => ({
//     tutorialPageNumber : state.student.tutorialPage,
//     tutorial: state.student.tutorial
// })

// export default connect(mapStateToProps)(TutorialPage1);