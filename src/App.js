import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import MainContent from './Main/MainContent';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MainContent />
      </div>
    );
  }
}

export default App;
