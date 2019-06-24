'use strict';
module.exports = (sequelize, DataTypes) => {
  const friends = sequelize.define('friends', {
    status: DataTypes.ENUM('requested','accepted'),
    person : DataTypes.INTEGER,
    other_person : DataTypes.INTEGER
  }, {});
  friends.associate = function(models) {
    friends.belongsTo(models.users,{
      foreignKey : "person",
    })
  };
  friends.associate = function(models) {
    friends.belongsTo(models.users,{
      foreignKey : "other_person",
    })
  };
  return friends;
};