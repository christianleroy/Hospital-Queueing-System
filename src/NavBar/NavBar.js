import React from 'react';

function NavBar(){
	return (
	<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal text-danger">MedWay</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="#">Home</a>
        <a className="p-2 text-dark" href="#">Doctors</a>
        <a className="p-2 text-dark" href="#">Patients</a>
      </nav>
      <a className="btn btn-outline-danger" href="#">Login</a>
    </div>
	);
}

export default NavBar;