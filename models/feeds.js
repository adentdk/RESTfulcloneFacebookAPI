'use strict';
module.exports = (sequelize, DataTypes) => {
  const feeds = sequelize.define('feeds', {
    user_id : DataTypes.INTEGER,
    from_group: DataTypes.STRING,
    media: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  feeds.associate = function(models) {
    feeds.belongsTo(models.users,{
      foreignKey : "user_id"
    })
    feeds.hasMany(models.feed_responses,{
      foreignKey : "response_id"
    })
    feeds.hasMany(models.feed_comments,{
      foreignKey : "feed_id"
    })
  };
  return feeds;
};