'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comment_responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment_id : {
        type: Sequelize.INTEGER,
        references :{
          model: 'feed_comments',
          key: "id"
        },
        allowNull: false
      },
      response_id : {
        type: Sequelize.INTEGER,
        references :{
          model: 'responses',
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
    return queryInterface.dropTable('comment_responses');
  }
};