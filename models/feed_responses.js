'use strict';
module.exports = (sequelize, DataTypes) => {
  const feed_responses = sequelize.define('feed_responses', {
    feed_id : DataTypes.INTEGER,
    response_id : DataTypes.INTEGER,
    user_id : DataTypes.INTEGER
  }, {});
  feed_responses.associate = function(models) {
    feed_responses.belongsTo(models.feeds,{
      foreignKey : "feed_id",
    })
  };
  feed_responses.associate = function(models) {
    feed_responses.belongsTo(models.users,{
      foreignKey : "users_id",
    })
  };
  feed_responses.associate = function(models) {
    feed_responses.belongsTo(models.responses,{
      foreignKey : "response_id",
    })
  };
  return feed_responses;
};