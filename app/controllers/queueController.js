'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;
const Doctor = db.Doctor;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const io = require('../io/io').getIo();
const home = io.of('/').on('connection', socket=>{
  console.log("Connected from Home page.");
});

exports.getActiveQueue = async function(req, res){
  let queue = await Queue.findAll({
    attributes: ['id', 'startDate'],
    where: {
      isActive: true
    },
    include: [{
      model: Ticket
    }]
  });
  res.send(queue);
}

exports.getTickets = async function(req, res){
  let tickets = await Ticket.findAll({
    attributes: ['id', 'ticketNumber', 'queueId'],
    where:{
      isActive: true
    },
    order:[['ticketNumber']],
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
        attributes: ['firstName', 'lastName', 'gender', 'birthday', 'caseDescription']
      },
      {
        model: Doctor,
        as: 'doctor',
        attributes: ['firstName', 'lastName'],
        required: false
      }
    ]
  });
  const result = tickets.map(ticket=>({
    ticketNo: ticket.ticketNumber,
    queueId: ticket.queueId,
    firstName: ticket.patient.firstName,
    lastName: ticket.patient.lastName,
    gender: ticket.patient.gender,
    birthday: ticket.patient.birthday,
    caseDescription: ticket.patient.caseDescription,
    doctor: ticket.doctor ? "Dr. "+ticket.doctor.firstName+" "+ticket.doctor.lastName : "No attending physician yet."
  }));
  res.send(result);
}

exports.getTicketsWithDoctors = async function(req, res){
  let ticketsWithDoctors = await Ticket.findAll({
    where: {
      isActive: true,
      doctorId: {
        [Op.ne] : null
      }
    },
    order: [['updatedAt','DESC']],
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
      attributes: ['firstName', 'lastName']
    },
    {
      model: Doctor,
      as: 'doctor',
      attributes: ['firstName','lastName']
    }
    ]
  });
  const result = ticketsWithDoctors.map(ticket => {
    return { ticketId: ticket.id,
      ticketNumber: ticket.ticketNumber,
      patient: ticket.patient.firstName +" "+ticket.patient.lastName,
      doctor: ticket.doctor.firstName +" "+ticket.doctor.lastName
    };
  });
  res.send(result);
}

exports.openNewQueue = async function(req, res){
  let result = {
    success: false,
    message: null
  }
  try{
    let activeQueue = await Queue.findAll({
      where: {
        isActive: true
      }
    });
    if(activeQueue.length!==0){
      result.success = false;
      result.message = 'There is an active queue. Close this queue before opening a new one.';
    } else {
      let queue = await Queue.create({
        isActive: true,
        startDate: new Date()
      });
      result.success = true;
      result.message = "Successfully opened a new queue."
    }
  } catch(e){
    result.success = false;
    result.message = e;
  }
  res.send(result);
}

exports.closeActiveQueue = async function(req, res){
  let result = {
    success: false,
    message: null
  };
  try {
    let activeQueue = await Queue.findAll({
      where: {
        isActive: true
      }
    });
    if(activeQueue.length===0){
      result.success = false;
      result.message = 'No active queue to close.';
    } else {
      activeQueue = activeQueue[0];
      await activeQueue.update({
        isActive: false,
        endDate: new Date()
      })
      result.success = true;
      result.message= 'Active queue has been successfully closed.';
      home.emit("closeQueue");
    }
  }
  catch(e){
    result.success = false;
    result.message = e;
  }
  res.send(result);
}
