import React, {Component} from 'react';
import axios from 'axios';
import {config} from '../Config/config';
import socketIOClient from "socket.io-client";

class OnDutyDoctors extends Component{

  constructor(){
    super();
    this.URL = config.URL;
    this.state = {
      onDutyDoctors: []
    };
  }

  componentDidMount(){
  		this.refresh();
      const socket = socketIOClient(`${this.URL}/queue`);
      socket.on("doctorToggleDuty", ()=>{
        this.refresh();
      });
  }

  async refresh(){
    let onDutyDoctors = (await axios.get(`${this.URL}/doctors/getondutydoctors`)).data;
    this.setState({
      onDutyDoctors
    });
  }

  getTicket(doctor){
    if(doctor.ticketNumber){
      return doctor.ticketNumber.toString().padStart(4, "0");
    } else {
      return "Available";
    }
  }

  getPatient(doctor){
    if(doctor.patientFirstName){
      let patient = doctor.patientFirstName +" "+ doctor.patientLastName;
      return <React.Fragment><strong className="text-danger">Patient: </strong> {patient}</React.Fragment>;
    } else{
      return <React.Fragment><strong className="text-danger">Patient: </strong>No patient.</React.Fragment>
    }
  }

  async nextPatient(doctorId){
    await axios.post(`${this.URL}/doctors/nextpatient`, {
      doctorId
    });
    this.props.refreshTickets();
    this.refresh();
  }

  render(){
    return (
      <div className="row" style={{marginTop:'20px', marginBottom:'20px', marginLeft: '5px', marginRight: '5px'}}>
        {this.state.onDutyDoctors.length===0 && 'No on duty doctors.'}
        {this.state.onDutyDoctors.length>0 && this.state.onDutyDoctors.map(onDutyDoctor => (
          <div key={onDutyDoctor.doctorId} className="col-sm-4 card text-center">
            <div className="card-body">
              <h1>{this.getTicket(onDutyDoctor)}</h1>
              <div className="card-text">
                <p><strong className="text-danger">Doctor:</strong> {onDutyDoctor.doctorFirstName +" "+ onDutyDoctor.doctorLastName}</p>
                <p>{this.getPatient(onDutyDoctor)}</p>
              </div>
              <button className="btn btn-sm btn-danger"
                onClick={()=>this.nextPatient(onDutyDoctor.doctorId)}
              >Next Patient</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default OnDutyDoctors;
