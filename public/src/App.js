import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="App">
          <h1>Hey Earth!</h1>
        </div>
      </div>
    );
  }
}

export default App;
