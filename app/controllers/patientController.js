'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;

exports.create = async function(req, res){

	let {firstName, lastName, caseDescription, gender, birthday} = req.body;
	let activeQueue = await Queue.findAll({
		where:{
			isActive: true
		}
	});

	if(activeQueue.length>0){
		try{
			activeQueue = activeQueue[0];
			let patient = await Patient.create({
				firstName,
				lastName,
				caseDescription,
				gender,
				birthday
			});
			let ticket = await Ticket.create({
				isActive: true,
				patient: patient,
				queue: activeQueue
			});
			await ticket.setPatient(patient);
			await ticket.setQueue(activeQueue);
		}
		catch(e){
			let result = {
				success: false,
				message: e
			};
			res.send(result);
		}
		let result = {
			success: true,
			message: "Patient successfuly created."
		}
		res.send(result)
	} else {
		let result = {
			success: false,
			message: "No active queue."
		};
		res.send(result);
	}	
}