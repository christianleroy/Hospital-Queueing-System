'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Patients', [{
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        birthday: '2000-01-29',
        createdAt: '2018-12-26 13:39:00',
        updatedAt: '2018-12-26 13:39:00'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
