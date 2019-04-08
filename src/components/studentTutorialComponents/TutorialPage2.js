import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';


export default class TutorialPage2 extends React.Component {




    render(){
        return(
            <div>
                <p>I probably don't need to be a class! 2</p>
                <button>Previous Tutorial Page</button>
                <button>Next Tutorial Page</button>
                <button>Quit Tutorial</button>
            </div>
        )
    }
}


// const mapStateToProps = state => ({
//     tutorialPageNumber : state.student.tutorialPage
// })

// export default connect(mapStateToProps)(TutorialPage2);