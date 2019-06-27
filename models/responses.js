'use strict';
module.exports = (sequelize, DataTypes) => {
  const responses = sequelize.define('responses', {
    name: DataTypes.STRING
  }, {});
  responses.associate = function(models) {
    responses.hasMany(models.feed_responses,{
      foreignKey : "response_id"
    })
    responses.hasMany(models.comment_responses,{
      foreignKey : "response_id"
    })
  };
  return responses;
};