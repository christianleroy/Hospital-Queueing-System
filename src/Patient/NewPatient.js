import React, { Component } from 'react';

class NewPatient extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<React.Fragment>
			  <div className="form-group">
			  	<h4 className="text-danger" className="text-danger">New Patient</h4>
			    <label for="firstName" className="text-danger">First Name</label>
			    <input type="text" className="form-control" id="firstName" placeholder="First Name"/>
			  </div>
			  <div className="form-group">
			    <label for="lastName" className="text-danger">Last Name</label>
			    <input type="text" className="form-control" id="lastName" placeholder="Last Name"/>
			  </div>
			  <div className="form-group">
			  		<button type="button" className="btn btn-danger">Submit</button>
			  		<button type="button" className="btn btn-default">Reset</button>
			  </div>
			</React.Fragment>
		);
	}
}

export default NewPatient;