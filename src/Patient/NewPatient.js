import React, { Component } from 'react';
import { config } from '../Config/config.js';
import axios from 'axios';

class NewPatient extends Component{

	constructor(props){
		super(props);
		this.URL = config.URL;
		this.initialState =  {
			firstName: '',
			lastName: '',
			gender: '',
			birthday: '',
			caseDescription: '',
			disabled: false
		};
		this.state = this.initialState;
	}

	updateFirstName(value){
		this.setState({
			firstName: value
		});
	}

	updateLastName(value){
		this.setState({
			lastName: value
		});
	}

	updateCaseDescription(value){
		this.setState({
			caseDescription: value
		});
	}

	updateGender(value){
		this.setState({
			gender: value
		});
	}

	updateBirthday(value){
		this.setState({
			birthday: value
		});
	}

	async submit(){
		this.setState({
	      disabled: true
	    });

		let {firstName, lastName, caseDescription, birthday, gender } = this.state;
	    await axios.post(`${this.URL}/patients/create`, {
	      firstName,
	      lastName,
	      caseDescription,
	      birthday,
	      gender
	    }).then(function(response){
	    	console.log(response);
	    }).catch(function(error){
	    	console.log(error);
	    });
	    this.setState({ disabled: false });

	}

	reset(){
		this.setState(this.initialState);
	}

	render(){
		return(
			<React.Fragment>
			  <div className="form-group">
			  	<h4 className="text-danger">New Patient</h4>
			    <label htmlFor="firstName" className="text-danger">First Name</label>
			    <input type="text" className="form-control" id="firstName" placeholder="First Name"
			    	onBlur={(e) => this.updateFirstName(e.target.value)}
			    	onChange={(e) => this.updateFirstName(e.target.value)}
			    	value={this.state.firstName}
			    />
			  </div>
			  <div className="form-group">
			    <label htmlFor="lastName" className="text-danger">Last Name</label>
			    <input type="text" className="form-control" id="lastName" placeholder="Last Name"
			    	onBlur={(e) => this.updateLastName(e.target.value)}
			    	onChange={(e) => this.updateLastName(e.target.value)}
			    	value={this.state.lastName}
			    />
			  </div>
			  <div className="form-group">
			    <label htmlFor="caseDescription" className="text-danger">Case Description</label>
			    <textarea className="form-control" id="caseDescription" rows="3"
			    	onBlur={(e) => this.updateCaseDescription(e.target.value)}
			    	onChange={(e) => this.updateCaseDescription(e.target.value)}
			    	value={this.state.caseDescription}
			    >
			    </textarea>
			  </div>
			  <div className="form-group">
			  	<label className="text-danger">Gender</label>
			  </div>
			  <div className="form-group">
			  	<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="gender" id="male" value="Male"
				  	onChange={(e) => this.updateGender(e.target.value)}
				  	checked={this.state.gender==="Male"}
				  />
				  <label className="form-check-label" htmlFor="male">
				    Male
				  </label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="gender" id="female" value="Female"
				  	onChange={(e) => this.updateGender(e.target.value)}
				  	checked={this.state.gender==="Female"}
				  />
				  <label className="form-check-label" htmlFor="female">
				  	Female
				  </label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="gender" id="other" value="Other"
				  	onChange={(e) => this.updateGender(e.target.value)}
				  	checked={this.state.gender==="Other"}
				  />
				  <label className="form-check-label" htmlFor="other">
				  	Other
				  </label>
				</div>
			  </div>
			  <div className="form-group">
			    <label htmlFor="birthday" className="text-danger">Birthday</label>
			    <input type="text" className="form-control" id="birthday" placeholder="Birthday"
			    	onBlur={(e) => this.updateBirthday(e.target.value)}
			    	onChange={(e) => this.updateBirthday(e.target.value)}
			    	value={this.state.birthday}
			    />
			  </div>
			  <div className="form-group">
			  		<button type="button" className="btn btn-danger"
			  			onClick={() => this.submit() }
			  			disabled={this.state.disabled}
			  		>
			  		Submit</button>
			  		<button type="button" className="btn btn-default"
			  			onClick={() => this.reset() }
			  			disabled={this.state.disabled}
			  		>
			  		Reset</button>
			  </div>
			</React.Fragment>
		);
	}
}

export default NewPatient;