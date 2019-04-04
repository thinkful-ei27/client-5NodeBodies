import React from 'react';
import { connect } from 'react-redux';
import { getStudentAdventure } from '../actions/student.js'


let inputVal;
class SearchResults extends React.Component{


    handleClick(id){
        console.log(id.target.value);
        console.log(id);
        console.log(inputVal);
        this.props.dispatch(getStudentAdventure(id));
    }
    handleChange(e){
        console.log(e.target.value);
        inputVal = e.target.value;
    }

    render(){
        let adventures;
        if(this.props.results){
            adventures = this.props.results.map((adventure) => {
            let pass;
            console.log(adventure);
            if(adventure.hasPassword){
                pass = <input onChange={e => this.handleChange(e)} type='password' placeholder='Password Required'></input>
            }
            return (<li
                className="adventure-list-item" 
                key={adventure.id}><p>title: {adventure.title}</p>
                {pass}
                <button 
                    className="adventure-link-button below" 
                    value={adventure.id} 
                    onClick={e => {this.handleClick(e)}}>Click to start</button>
            </li>)})

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
  