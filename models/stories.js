'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define('stories', {
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    media: DataTypes.STRING
  }, {});
  stories.associate = function(models) {
    stories.belongsTo(models.users,{
      foreignKey : "user_id"
    })
  };
  return stories;
};