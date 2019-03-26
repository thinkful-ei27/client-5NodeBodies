import React from 'react';

import { connect } from 'react-redux';

class Login extends React.Component{



  render(){
    return (
      <div>This is the Login!
        <form>
          <input 
            className="user-name" 
            type="text"></input>
          <input 
            className="user-password"
            type="password"></input>
          <button 
            className="submit-button"
            type="submit">Login</button>
        </form>
      </div>
    )
  }

}


export default connect()(Login);
