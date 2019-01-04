import React from 'react';
import {Link, withRouter } from 'react-router-dom';

function NavBar(props){
	let activeTab = props.location.pathname;
	return (
	<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal text-danger">Outpatient Hospital Queueing System</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className={(activeTab==="/" && "p-2 text-danger") || "p-2 text-dark"} to="/">Home</Link>
        <Link className={(activeTab==="/queue" && "p-2 text-danger") || "p-2 text-dark"} to="/queue">Queue</Link>
        <Link className={(activeTab==="/doctors" && "p-2 text-danger") || "p-2 text-dark"} to="/doctors">Doctors</Link>
      </nav>
      <a className="btn btn-outline-danger" href="/login">Login</a>
    </div>
	);
}
export default withRouter(NavBar);
