import React, { Component } from 'react';
import NewPatient from '../Patient/NewPatient';
import Queue from '../Queue/Queue';

class Home extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (<React.Fragment>
			<div className="container">
			  <div className="row">
			    <div class="col-4 card">
			      <NewPatient/>
			    </div>
			    <div class="col-8 card">
			    	<Queue />
			    </div>
			  </div>
			</div>
			</React.Fragment>
		);
	}

}

export default Home;