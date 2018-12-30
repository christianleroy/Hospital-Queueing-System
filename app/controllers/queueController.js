'use strict';
const db = require('../models/index.js');
const Patient = db.Patient;
const Queue = db.Queue;
const Ticket = db.Ticket;

exports.getTickets = async function(req, res){
  let tickets = await Ticket.findAll({
    attributes: ['id', 'queueId'],
    where:{
      isActive: true
    },
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
    ticketNo: ticket.id,
    queueId: ticket.queueId,
    firstName: ticket.patient.firstName,
    lastName: ticket.patient.lastName
  }));
  res.send(result);
}
