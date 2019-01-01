import React, { Component } from 'react';
import QueueTickets from './QueueTickets';
import QueueControl from './QueueControl';
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

	async refresh(){
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
						<QueueControl refreshTickets={() => this.refresh()}/>
					</div>
					<div className="col-8 card">
						<QueueTickets
							refresh={() => this.refresh()}
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
