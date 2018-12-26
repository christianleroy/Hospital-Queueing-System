import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Patients from './Patients/Patients';
import Doctors from './Doctors/Doctors';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/patients" component={Patients} />
        <Route exact path="/doctors" component={Doctors} />
      </div>
    );
  }
}

export default App;
