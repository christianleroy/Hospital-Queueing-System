'use strict';
const db = require('../models/index.js');
const Doctor = db.Doctor;
const Ticket = db.Ticket;
const Queue = db.Queue;
const Patient = db.Patient;
const io = require('../io/io').getIo();
const home = io.of('/').on('connection', socket=>{
  console.log("Connected from Home page.");
});
const queue = io.of('/queue').on('connection', socket=>{
  console.log("Connected from Queue page.");
});

exports.addDoctor = async function(req, res){
  let { firstName, lastName, onDuty } = req.body;
  let result = {
    success: false,
    message: null
  };

  try{
    let newDoctor = await Doctor.create({
      firstName,
      lastName,
      onDuty
    });
    result.success = true;
    result.message = "Successfully added a new doctor.";

  } catch(e){
    result.success = false;
    result.message = e.toString();
  }
  res.send(result);
}

exports.toggleDuty = async function(req, res){

  let { doctorId } = req.body;
  let result = {
    success: false,
    message: null
  };
  
  try {
    let doctor = await Doctor.findByPk(doctorId);
    if(doctor){
      await doctor.update({
        onDuty: !doctor.onDuty
      });
      result.success = true;
      result.message = "Successfull changed doctor on-duty status.";
    } else {
      result.success = false;
      result.message = "Doctor not found.";
    }

  } catch(e){
    result.success = false;
    result.message = e.toString();
  }
  queue.emit("doctorToggleDuty");
  res.send(result);
}

exports.getAllDoctors = async function(req, res){
  let doctors = await Doctor.findAll({
    attributes: ['id','firstName','lastName','onDuty'],
    order: [['lastName'],['firstName']]
  });

  const result = doctors.map(doctor=>{
    return {
      doctorId: doctor.id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      onDuty: doctor.onDuty
    }
  });

  res.send(result);
}

exports.getOnDutyDoctors = async function(req, res){
  let doctors = await Doctor.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    where: {
      onDuty: true
    },
    order: [['lastName'],['firstName']],
    include: [{
      model: Ticket,
      where: {
        isActive: true
      },
      attributes: ['id', 'ticketNumber'],
      required: false,
      include: [{
        model: Queue,
        as: 'queue',
        attributes: ['id'],
        where: {
          isActive: true
        }
      },
      {
        model: Patient,
        as: 'patient',
        attributes: ['firstName', 'lastName'],
        required: false
      }
    ]
    }]
  });

  const result = doctors.map(doctor =>({
    doctorId: doctor.id,
    doctorFirstName: doctor.firstName,
    doctorLastName: doctor.lastName,
    ticketId: doctor.Tickets.length > 0 ? doctor.Tickets[0].id : null,
    ticketNumber: doctor.Tickets.length > 0 ? doctor.Tickets[0].ticketNumber : null,
    patientFirstName: doctor.Tickets.length > 0 ? doctor.Tickets[0].patient.firstName: null,
    patientLastName: doctor.Tickets.length > 0 ? doctor.Tickets[0].patient.lastName: null
  }));
  res.send(result);
}

exports.nextPatient = async function(req, res){

    let result = {
      success: false,
      message: null
    };

    try {
      let { doctorId } = req.body;
      let doctor = await Doctor.findByPk(doctorId, {
        include: [{
          model: Ticket,
          attributes: ['id'],
          where: {
            isActive: true,
          },
          required: false,
          include: [{
            model: Queue,
            as: 'queue',
            attribute: ['id'],
            where: {
              isActive: true
            }
          }]
        }]
      });

      if(doctor.Tickets.length>0){
        let ticket = await Ticket.findByPk(doctor.Tickets[0].id);
        await ticket.update({
          isActive: false
        });
        result.message = "Successfully closed current ticket.";
      }

      let nextTicket = await Ticket.findAll({
        attributes: ['id'],
        where: {
          isActive: true,
          doctorId: null
        },
        include: [{
          model: Queue,
          as: 'queue',
          attributes: ['id'],
          where: {
            isActive: true
          }
        }],
        order: [['ticketNumber', 'ASC']]
      });

      if(nextTicket[0]){
        await doctor.addTicket(nextTicket[0]);
        result.message = "Successfully closed current ticket and moved to the next patient.";
      }
      result.success = true;
      home.emit('next');

    } catch(e){
      result.success = false;
      result.message = e.toString();
    }

    res.send(result);
}
