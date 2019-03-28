import React from 'react';
import { Form, Field, reduxForm} from 'redux-form';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import Input from "./input";
import { } from '../actions/createAdventure';
import { required, nonEmpty } from "../utils/validators";

export default function ParentForm(props) {
    // if (!props.loggedIn) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="parentForm">
        <div className="question">What is the meaning of life</div>
        <button onClick={ () => console.log("Edit Answer 1 Clicked!")}>42</button>
        <button onClick={ () => console.log("Edit Answer 2 Clicked!")}>food</button>
      </div>
    )

  }

  const mapStateToProps = (state, props) => ({
    loggedIn: state.auth.currentUser !== null,
    adventureId: state.adventure.adventureId,
    adventure: state.adventure.adventure
  });

 withRouter(connect(mapStateToProps)(ParentForm));