import React, { Component } from 'react';
import NewPatient from '../Patient/NewPatient';
import DisplayQueue from '../Queues/DisplayQueue';

class Home extends Component{
	render(){
		return (<React.Fragment>
			<div className="container">
			  <div className="row">
			    <div className="col-4 card">
			      <NewPatient />
			    </div>
			    <div className="col-8 card">
			    	<DisplayQueue />
			    </div>
			  </div>
			</div>
			</React.Fragment>
		);
	}

}

export default Home;
