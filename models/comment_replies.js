'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment_replies = sequelize.define('comment_replies', {
    content: DataTypes.TEXT,
    comment_id: DataTypes.INTEGER,
    user_id : DataTypes.INTEGER
  }, {});
  comment_replies.associate = function(models) {
    comment_replies.belongsTo(models.feed_comments,{
      foreignKey : "comment_id"
    })
    comment_replies.belongsTo(models.users,{
      foreignKey : "user_id"
    })
  };
  return comment_replies;
};