import React from 'react';
import { connect } from 'react-redux';
import { getStudentSearch } from '../actions/student';


let inputVal;
class AdventureSearch extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = inputVal;
    this.props.dispatch(getStudentSearch(searchTerm));
  }

  onChange(e) {
    inputVal = e.target.value;
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label className='input-field-label' for='input-field'><strong>Search a LearnVenture</strong></label>
        <input
          className="search-input-field"
          placeholder="Example: Making Breakfast"
          onChange={e => this.onChange(e)} type="text"></input>
        <button
          className="search-adventures on-right"
          type="submit">Search LearnVentures!</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default (connect(mapStateToProps)(AdventureSearch));
