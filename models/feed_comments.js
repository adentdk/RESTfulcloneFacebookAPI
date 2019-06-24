'use strict';
module.exports = (sequelize, DataTypes) => {
  const feed_comments = sequelize.define('feed_comments', {
    content: DataTypes.TEXT,
    feed_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  feed_comments.associate = function(models) {
    feed_comments.hasMany(models.comment_replies, {
      foreignKey : "comment_id"
    })
  };
  feed_comments.associate = function(models) {
    feed_comments.hasMany(models.comment_responses, {
      foreignKey : "comment_id"
    })
  };
  feed_comments.associate = function(models) {
    feed_comments.belongsTo(models.feeds, {
      foreignKey : "feed_id"
    })
  };
  feed_comments.associate = function(models) {
    feed_comments.belongsTo(models.users, {
      foreignKey : "user_id"
    })
  };
  return feed_comments;
};