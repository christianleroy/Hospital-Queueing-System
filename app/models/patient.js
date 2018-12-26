'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    lastName: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    gender: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    caseDescription: DataTypes.TEXT
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};