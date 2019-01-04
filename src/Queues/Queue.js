import React, { Component } from 'react';
import QueueTickets from './QueueTickets';
import QueueControl from './QueueControl';
import OnDutyDoctors from '../Doctors/OnDutyDoctors';
import axios from 'axios';
import { config } from '../Config/config.js';

class Queue extends Component{
	constructor(){
		super();
		this.URL = config.URL;
		this.state = ({
				tickets: []
		});
	}

	async refreshTickets(){
		let tickets = (await axios.get(`${this.URL}/queues/gettickets`)).data;
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
						<div className="container">
							<div className="row">
								<QueueControl refreshTickets={() => this.refreshTickets()}/>
							</div>
						</div>
					</div>
					<div className="col-8 card">
						<OnDutyDoctors refreshTickets={() => this.refreshTickets()}/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 card">
						<QueueTickets
							refreshTickets={() => this.refreshTickets()}
							tickets={this.state.tickets}
						/>
					</div>
				</div>
			</div>
			</React.Fragment>
		);
	}
}
export default Queue;
