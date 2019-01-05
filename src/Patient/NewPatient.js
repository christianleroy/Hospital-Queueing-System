import React, { Component } from 'react';
import { config } from '../Config/config.js';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewPatient extends Component{
	constructor(){
		super();
		this.URL = config.URL;
		this.initialState =  {
			firstName: '',
			lastName: '',
			gender: '',
			birthday: null,
			caseDescription: '',
			submitDisabled: true,
			resetDisabled: false,
			errorMessages: [],
		};
		this.state = this.initialState;
		this.updateBirthday = this.updateBirthday.bind(this);
	}

	updateFirstName(value){
		this.setState({
			firstName: value
		});
		this.validate();
	}

	updateLastName(value){
		this.setState({
			lastName: value
		});
		this.validate();
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

	validate(){
		let errorMessages = [];
		if(!this.state.firstName){
			errorMessages.push("First name field is required.");
		}
		if(!this.state.lastName){
			errorMessages.push("Last name field is required.");
		}

		this.setState({errorMessages});
		if(errorMessages.length===0){
			this.setState({submitDisabled: false})
		}
	}

	async submit(){
		this.setState({
		  submitDisabled: true,
	      resetDisabled: true
	    });

		let {firstName, lastName, caseDescription, birthday, gender } = this.state;
	    await axios.post(`${this.URL}/patients/create`, {
	      firstName,
	      lastName,
	      caseDescription,
	      birthday,
	      gender
	    }).then(response => {
	    	this.setState(this.initialState);
	    }).catch(function(error){
	    	console.log(error);
	    });
	    this.setState({ submitDisabled:false, resetDisabled: false });

	}

	reset(){
		this.setState(this.initialState);
	}

	render(){
		return(
			<React.Fragment>
				<div className="container card" style={{marginTop: '20px', marginBottom: '20px'}}>
					<div className="form-group" style={{marginTop: '20px'}}>
						<h4 className="text-danger">New Patient</h4>
						{ this.state.errorMessages.length > 0 &&
						<div className="alert alert-danger" role="alert">
							{ this.state.errorMessages.map(errorMessage =>(
								<li key={errorMessage}>
									{errorMessage}
								</li>
							)
							)}
						</div>
						}
					</div>
					<div className="form-group">
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
					</div>
					<div className="form-group">
						<DatePicker
							className="form-control"
							id="birthday" placeholder="Birthday"
							onChange={this.updateBirthday}
							selected={this.state.birthday}
							dateFormat="yyyy-MM-dd"
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
							<button type="button" className="btn btn-danger"
								onClick={() => this.submit() }
								disabled={this.state.submitDisabled}
							>
							Submit</button>
							<button type="button" className="btn btn-default"
								onClick={() => this.reset() }
								disabled={this.state.resetDisabled}
							>
							Reset</button>
					</div>
				</div>

			</React.Fragment>
		);
	}
}

export default NewPatient;
