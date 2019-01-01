import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Config/config.js';

class QueueTickets extends Component{
	componentDidMount(){
		this.props.refresh();
	}

	render(){
		return (
			<React.Fragment>
          <table className="table table-striped table-hover table-bordered" style={{marginTop:'20px'}}>
            <thead>
              <tr>
                <th className="text-danger">Ticket #</th>
                <th className="text-danger">Patient</th>
              </tr>
            </thead>
            <tbody>
							{this.props.tickets.length===0 && <tr><td colSpan="2">There are no tickets at the moment.</td></tr> }
							{this.props.tickets.length > 0 && this.props.tickets.map(ticket=>(
                <tr key={ticket.ticketNo}>
									<td>{ticket.ticketNo.toString().padStart(4, "0")}</td>
                  <td>{ticket.lastName+", "+ticket.firstName}</td>
                </tr>
							))}
            </tbody>
          </table>
			</React.Fragment>
		);
	}
}

export default QueueTickets;
