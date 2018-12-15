import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
