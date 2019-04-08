import React from 'react';
// import { connect } from 'react-redux';
import './Tutorial.css';

export default class TutorialPage4 extends React.Component {


    render(){
        return(
            <div>
                <p>I probably don't need to be a class! 4</p>
                <button>Previous Tutorial Page</button>
                <button>Quit Tutorial</button>
            </div>
        )
    }
}


// const mapStateToProps = state => ({
//     tutorialPageNumber : state.student.tutorialPage
// })

// export default connect(mapStateToProps)(Tutorial);