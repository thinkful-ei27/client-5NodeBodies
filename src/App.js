import React, { Component } from 'react';
import Headerbar from './components/headerbar.js';
import Login from './components/login.js';
import RegisterForm from './components/registration.js';
import Dashboard from './components/dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Headerbar />
        <Login />
        <RegisterForm />
        <Dashboard />
      </div>
    );
  }
}

export default App;
