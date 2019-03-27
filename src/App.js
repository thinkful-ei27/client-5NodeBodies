import React, { Component } from 'react';
import Headerbar from './components/headerbar.js';
import Login from './components/login.js';
import RegisterForm from './components/registration.js';
import AdventureForm from './components/newAdventure'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AdventureForm />
      </div>
    );
  }
}

export default App;
