'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;

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
        attributes: ['firstName', 'lastName', 'gender']
      }
    ]
  });
  const result = tickets.map(ticket=>({
    ticketNo: ticket.ticketNumber,
    queueId: ticket.queueId,
    firstName: ticket.patient.firstName,
    lastName: ticket.patient.lastName
  }));
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
    }
  }
  catch(e){
    result.success = false;
    result.message = e;
  }
  res.send(result);
}
