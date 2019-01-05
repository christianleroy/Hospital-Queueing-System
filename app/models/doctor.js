'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    onDuty: DataTypes.BOOLEAN
  }, {});
  Doctor.associate = function(models) {
    // associations can be defined here
    Doctor.hasMany(models.Ticket, { foreignKey: 'doctorId' });
  };
  return Doctor;
};
