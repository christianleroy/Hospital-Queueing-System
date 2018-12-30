'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tickets',
      'patientId',
      Sequelize.INTEGER
    );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn(
      'Tickets',
      'patientId'
  );
  }
};
