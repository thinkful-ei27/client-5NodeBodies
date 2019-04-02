import React from 'react';
import { connect } from 'react-redux';
import { getStudentAdventure } from '../actions/student.js'


class SearchResults extends React.Component{


    handleClick(id){
        console.log(id);
        this.props.dispatch(getStudentAdventure(id));
    }

    render(){
        let adventures;
        if(this.props.results){
            console.log('searchResults is running!');
            console.log(this.props.results);
            adventures = this.props.results.map((adventure) => <li className="adventureList" key={adventure.id}><p>title: {adventure.title}</p>
            <button className="adventureButton" value={adventure.id} onClick={e => {this.handleClick(e.target.value)}}>Click</button>
            </li>)
            console.log(adventures);
        }
        return(
            <div className="searchResults">
                <ul>{adventures}</ul>
            </div>
        )
    }

}



const mapStateToProps = state => {
    return {
      results: state.student.searchResults
    };
  };
  
  export default (connect(mapStateToProps)(SearchResults));
  