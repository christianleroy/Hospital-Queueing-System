'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tickets', ['patientId'], {
      type: 'foreign key',
      name: 'Tickets_patientId_fkey',
      references: {
        table: 'Patients',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Tickets',
      'Tickets_patientId_fkey'
    );
  }
};
