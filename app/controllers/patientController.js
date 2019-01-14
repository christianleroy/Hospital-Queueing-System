'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;
const io = require('../io/io').getIo();
const queue = io.of('/queue').on('connection', socket=>{
  console.log("Connected from Queue page.");
});

exports.create = async function(req, res){
	let {firstName, lastName, caseDescription, gender, birthday} = req.body;
	let activeQueue = await Queue.findAll({
		where:{
			isActive: true
		},
		include: [{
			model: Ticket
		}]
	});
	
	let result = {
		success: false,
		message: null
	};

	if(activeQueue.length>0){
		try{
			activeQueue = activeQueue[0];
			let tickets = await activeQueue.getTickets();
			let ticketNumber = tickets.length===0 ? 1 : tickets.length + 1;
			let patient = await Patient.create({
				firstName,
				lastName,
				caseDescription,
				gender,
				birthday
			});
			let ticket = await Ticket.create({
				isActive: true,
				ticketNumber
			});
			await ticket.setPatient(patient);
			await ticket.setQueue(activeQueue);
			result.success = true;
			result.message = "Patient successfully created.";

			queue.emit("newPatient");
		}
		catch(e){
			result.success = false;
			result.message = e.toString();
		}
	} else {
		result.success = false;
		result.message = "No active queue.";
	}
	res.send(result);

}
