'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Doctors',
      'specialization'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Doctors',
      'specialization',
      Sequelize.STRING
    );
  }
};
