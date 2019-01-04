import React, { Component } from 'react';

class DisplayQueue extends Component {
	constructor(){
		super();
		this.state={
			tickets: []
		};
	}
	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-lg-12 card text-center" style={{height: '250px', marginTop: '20px'}}>
						<div className="card-body">
							<h1 className="text-danger display-4"><strong>0012</strong></h1>
						</div>
						<div className="card-text">
							<p><strong className="text-danger">Doctor: </strong>Elena Perez</p>
							<p><strong className="text-danger">Patient: </strong>Maria Perez</p>
						</div>
					</div>
				</div>
				<div className="row" style={{marginBottom:'20px'}}>
					<div className="col-sm-3 card text-center">
						<div className="card-body">
							<h1 className="text-danger display-4">0012</h1>
						</div>
						<div className="card-text">
							<p><strong className="text-danger">Doctor: </strong>Elena Perez</p>
							<p><strong className="text-danger">Patient: </strong>Maria Perez</p>
						</div>
					</div>
				</div>
			</div>
		);
	}


}

export default DisplayQueue;
