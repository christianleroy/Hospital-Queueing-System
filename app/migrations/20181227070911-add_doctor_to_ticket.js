'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tickets',
      'doctorId',
      Sequelize.INTEGER
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Tickets',
      'doctorId'
    );
  }
};
