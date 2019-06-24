'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment_responses = sequelize.define('comment_responses', {
    comment_id : DataTypes.INTEGER,
    user_id : DataTypes.INTEGER,
    response_id : DataTypes.INTEGER
  }, {});
  comment_responses.associate = function(models) {
    comment_responses.belongsTo(models.responses,{
      foreignKey : "response_id"
    })
  };
  comment_responses.associate = function(models) {
    comment_responses.belongsTo(models.feed_comments,{
      foreignKey : "comment_id"
    })
  };
  comment_responses.associate = function(models) {
    comment_responses.belongsTo(models.users,{
      foreignKey : "users_id"
    })
  };
  return comment_responses;
};