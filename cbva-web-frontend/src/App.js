import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListFirefighters from './firefighters/ListFirefighters'
class App extends Component {
  render() {
    return (
      <div className="App">
          <ListFirefighters/>

       </div>
    );
  }
}

export default App;
