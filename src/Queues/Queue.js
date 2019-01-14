import React, { Component } from 'react';
import QueueTickets from './QueueTickets';
import QueueControl from './QueueControl';
import OnDutyDoctors from '../Doctors/OnDutyDoctors';
import axios from 'axios';
import { config } from '../Config/config.js';
import socketIOClient from "socket.io-client";

class Queue extends Component{

	constructor(){
		super();
		this.URL = config.URL;
		this.state = ({
			tickets: []
		});
	}

	componentDidMount(){
		const socket = socketIOClient(`${this.URL}/queue`);
		socket.on("next", () => {
			this.refreshTickets();
		});
		socket.on("newPatient", ()=> {
			this.refreshTickets();
		});
	}

	async refreshTickets(){
		let tickets = (await axios.get(`${this.URL}/queues/gettickets`)).data;
		this.setState({
			tickets
		});
	}

	getActiveTickets(){
		let activeTickets = this.state.tickets.map(ticket=>{
			return ticket.isActive === true;
		}).length;
		return activeTickets;
	}

	render(){
		return (
			<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-4 card">
						<div className="container">
							<div className="row">
								<QueueControl
									refreshTickets={() => this.refreshTickets()}
									activeTickets={this.getActiveTickets()}
									totalTickets={this.state.tickets.length}/>
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
