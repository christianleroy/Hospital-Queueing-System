import React, {Component} from 'react';
import axios from 'axios';
import { config } from '../Config/config.js';
import socketIOClient from "socket.io-client";

class QueueControl extends Component{

  constructor(){
    super();
    this.URL = config.URL;
    this.initialState = {
      totalTickets: 0,
      startDate: null,
      hasOpenQueue: false
    };
    this.state = {...this.initialState};
  }

  componentDidMount(){
    this.refresh();
    const socket = socketIOClient(`${this.URL}/queue`);
    socket.on("newPatient", () => {
      this.refresh();
    });
  }

  async refresh(){
    let activeQueue = (await axios.get(`${this.URL}/queues/getactivequeue`)).data;
    if(activeQueue.length){
      activeQueue = activeQueue[0];
      this.setState({
        hasOpenQueue: true,
        totalTickets: activeQueue.Tickets.length,
        startDate: activeQueue.startDate
      });
    } else {
      this.setState({
        ...this.initialState
      });
      this.props.refreshTickets();
    }
  }

  async openNewQueue(){
    let result = (await axios.post(`${this.URL}/queues/opennewqueue`)).data;
    this.refresh();
  }

  async closeActiveQueue(){
    let result = (await axios.post(`${this.URL}/queues/closeactivequeue`)).data;
    this.refresh();
  }

  getButton(){
    let button = null;
    if(this.state.hasOpenQueue){
      button = <button type="button" onClick={()=>this.closeActiveQueue()} className="btn btn-danger">Close Queue</button>;
    } else {
      button = <button type="button" onClick={()=>this.openNewQueue()} className="btn btn-danger">Open New Queue</button>;
    }
    return button;
  }

  render(){
    return(
      <React.Fragment>
        <div className="card" style={{marginTop: '20px', marginBottom: '20px'}}>
          {!this.state.hasOpenQueue &&
          <div className="alert alert-danger">
            No queue is currently open. Click <em>Open New Queue</em> to start.
          </div>
          }
          <div className="card-header text-danger">
            Queue Control
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="text text-danger"> Active Tickets: </span>
              <span className="text">
                {this.props.activeTickets}
              </span>
            </li>
            <li className="list-group-item">
              <span className="text text-danger"> Total Tickets: </span>
              <span className="text">
                {this.state.totalTickets}
              </span>
            </li>
            <li className="list-group-item">
              <span className="text text-danger"> Date/Time Started: </span>
              <span className="text">
                {this.state.startDate}
              </span>
            </li>
          </ul>
          <div className="card-body">
            {this.getButton()}
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default QueueControl;
