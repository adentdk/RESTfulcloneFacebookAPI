'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feed_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feed_id : {
        type: Sequelize.INTEGER,
        references :{
          model: 'feeds',
          key: "id"
        },
        allowNull: false
      },
      user_id : {
        type: Sequelize.INTEGER,
        references :{
          model: 'users',
          key: "id"
        },
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      underscored: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feed_comments');
  }
};