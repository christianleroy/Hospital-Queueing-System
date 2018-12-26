const db = require('../models/index.js');
const Patient = db.Patient;

exports.create = function(req, res){

	let {firstName, lastName, caseDescription, gender, birthday} = req.body;

	let patient = Patient.build({
		firstName,
		lastName,
		caseDescription,
		gender,
		birthday
	})
	.save()
	.then(()=>{
		res.sendStatus(200)
	}).catch(error=>{
		console.log(error);
		res.sendStatus(500);
	});
}