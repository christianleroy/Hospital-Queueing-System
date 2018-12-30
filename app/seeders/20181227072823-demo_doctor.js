'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Doctors', [{
      firstName: 'Arthur',
      lastName: 'Curry',
      onDuty: true,
      specialization: 'Pediatrics',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Doctors', null, {});
  }
};
