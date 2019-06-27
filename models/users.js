'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    users.hasMany(models.stories,{
      foreignKey : "user_id"
    })
    users.hasMany(models.feeds,{
      foreignKey : "user_id"
    })
    users.hasMany(models.feed_responses,{
      foreignKey : "user_id"
    })
    users.hasMany(models.feed_comments,{
      foreignKey : "user_id"
    })
    users.hasMany(models.comment_responses,{
      foreignKey : "user_id"
    })
    users.hasMany(models.comment_replies,{
      foreignKey : "user_id"
    })
  };
  return users;
};