'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    isActive: DataTypes.BOOLEAN,
    ticketNumber: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
    Ticket.belongsTo(models.Queue, { as: 'queue' });
    Ticket.belongsTo(models.Patient, { as: 'patient' });
    Ticket.belongsTo(models.Doctor, {as: 'doctor' });
  };
  return Ticket;
};
