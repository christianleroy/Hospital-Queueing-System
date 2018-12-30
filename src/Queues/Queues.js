import React, { Component } from 'react';
import NewPatient from '../Patient/NewPatient';
import axios from 'axios';
import { config } from '../Config/config.js';

class Queues extends Component{
	constructor(){
		super();
		this.URL = config.URL;
		this.state = ({
				tickets: []
		});
	}

	async componentDidMount(){
		let tickets = (await axios.get(`${this.URL}/queues/gettickets`)).data;
		this.ticketFormat = "0000";
		this.setState({
			tickets
		});
	}

	render(){
		return (
			<React.Fragment>
			<div className="container">
			  <div className="row">
			    <div className="col-4 card">
						<h1>In the future, we'll add Queue control here.</h1>
			    </div>
			    <div className="col-8 card">
            <table className="table table-striped table-bordered table-hover" style={{marginTop:'20px'}}>
              <thead>
                <tr>
                  <th className="text-danger">Ticket #</th>
                  <th className="text-danger">Patient</th>
                </tr>
              </thead>
              <tbody>
								{this.state.tickets.length===0 && <tr><td>"No tickets."</td></tr> }
								{this.state.tickets.length > 0 && this.state.tickets.map(ticket=>(
	                <tr key={ticket.ticketNo}>
										<td>{ticket.ticketNo}</td>
	                  <td>{ticket.lastName+", "+ticket.firstName}</td>
	                </tr>
								))}
              </tbody>
            </table>
			    </div>
			  </div>
			</div>
			</React.Fragment>
		);
	}
}

export default Queues;
