import React, { Component } from 'react';
import { config } from '../Config/config.js';

class QueueTickets extends Component{
	componentDidMount(){
		this.props.refreshTickets();
	}

	render(){
		return (
			<React.Fragment>
          <table className="table table-striped table-hover table-bordered" style={{marginTop:'20px', marginBottom: '20px'}}>
            <thead>
              <tr>
                <th className="text-danger">Ticket #</th>
                <th className="text-danger">Patient</th>
								<th className="text-danger">Gender</th>
								<th className="text-danger">Birthday</th>
								<th className="text-danger">Case Description</th>
								<th className="text-danger">Attending Physician</th>
              </tr>
            </thead>
            <tbody>
							{this.props.tickets.length===0 && <tr><td colSpan="6">There are no tickets at the moment.</td></tr> }
							{this.props.tickets.length > 0 && this.props.tickets.map(ticket=>(
                <tr key={ticket.ticketNo}>
									<td style={{width: '100px'}}>{ticket.ticketNo.toString().padStart(4, "0")}</td>
                  <td style={{width: '200px'}}>{ticket.lastName+", "+ticket.firstName}</td>
									<td style={{width: '75px'}}>{ticket.gender}</td>
									<td style={{width: '75px'}}>{ticket.birthday}</td>
									<td style={{width: '300px'}}>{ticket.caseDescription}</td>
									<td style={{width: '100px'}}>{ticket.doctor}</td>
                </tr>
							))}
            </tbody>
          </table>
			</React.Fragment>
		);
	}
}

export default QueueTickets;
