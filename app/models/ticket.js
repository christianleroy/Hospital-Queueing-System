'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    isActive: DataTypes.BOOLEAN
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};