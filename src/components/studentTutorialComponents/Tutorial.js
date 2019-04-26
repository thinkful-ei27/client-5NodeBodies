import React from 'react';
import { connect } from 'react-redux';
import './Tutorial.css';
import TutorialPage1 from './TutorialPage1';
import TutorialPage2 from './TutorialPage2';
import TutorialPage3 from './TutorialPage3';
import TutorialPage4 from './TutorialPage4';


export class Tutorial extends React.Component {
    currentPage = pageNumber => {
        switch (pageNumber) {
            case 0: {
                return <TutorialPage1 />
            }
            case 1: {
                return <TutorialPage2 />
            }
            case 2: {
                return <TutorialPage3 />
            }
            case 3: {
                return <TutorialPage4 />
            }
            default: return <alert>Something has gone wrong. Please refresh the page</alert>

        }
    }



    render() {
        return (
            <section>
                {this.currentPage(this.props.tutorialPageNumber)}
            </section>
        )
    }
}


const mapStateToProps = state => ({
    tutorialPageNumber: state.student.tutorialPage
})

export default connect(mapStateToProps)(Tutorial);