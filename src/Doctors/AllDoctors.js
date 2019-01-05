import React, { Component } from 'react';

class AllDoctors extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
      <table className="table table-striped table-hover table-bordered" style={{marginTop:'20px', marginBottom: '20px'}}>
        <thead>
          <tr>
            <th className="text-danger">First Name</th>
            <th className="text-danger">Last Name</th>
            <th className="text-danger">On Duty</th>
          </tr>
        </thead>
        <tbody>
          {this.props.doctors.length===0 && <tr><td colSpan="6">No doctors. Add a doctor to start.</td></tr> }
          {this.props.doctors.length>0 && this.props.doctors.map(doctor => (
            <tr key={doctor.doctorId}>
              <td>{doctor.firstName}</td>
              <td>{doctor.lastName}</td>
              <td width="100" align="center">
                <input type="checkbox" onChange={() => this.props.toggleDuty(doctor.doctorId)} checked={doctor.onDuty}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </React.Fragment>
    );
  }
}

export default AllDoctors;
