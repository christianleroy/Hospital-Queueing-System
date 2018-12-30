'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    caseDescription: DataTypes.TEXT
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.hasOne(models.Ticket, { foreignKey: 'patientId' })
  };
  return Patient;
};