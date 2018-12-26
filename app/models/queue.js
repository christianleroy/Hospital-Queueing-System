'use strict';
module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define('Queue', {
    isActive: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Queue.associate = function(models) {
    // associations can be defined here
  };
  return Queue;
};