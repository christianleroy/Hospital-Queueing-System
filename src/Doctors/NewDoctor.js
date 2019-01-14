import React, { Component } from 'react';
import { config } from '../Config/config.js';
import axios from 'axios';

class NewDoctor extends Component{

	constructor(){
		super();
		this.URL = config.URL;
		this.initialState =  {
			firstName: '',
			lastName: '',
      		onDuty: true,
			submitDisabled: true,
			resetDisabled: false,
			errorMessages: [],
		};
		this.state = this.initialState;
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

  updateOnDuty(){
  	let onDuty = this.state.onDuty;
    this.setState({
      onDuty: !onDuty
    });
    this.validate();
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
		
		let {firstName, lastName, onDuty } = this.state;
	    
	    await axios.post(`${this.URL}/doctors/adddoctor`, {
	      firstName,
	      lastName,
	      onDuty
	    }).then(response => {
	    	this.setState(this.initialState);
	    	this.props.refresh();
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
						<h4 className="text-danger">Add Doctor</h4>
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
					<div className="form-check" style={{marginBottom:'20px'}}>
					  <input className="form-check-input" type="checkbox" id="onDuty"
							onChange={() => this.updateOnDuty()}
							checked={this.state.onDuty}
						 />
					  <label className="form-check-label" htmlFor="onDuty">
					    On Duty
					  </label>
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

export default NewDoctor;
