'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feed_responses', {
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
        
      },
      user_id : {
        type: Sequelize.INTEGER,
        references :{
          model: 'users',
          key: "id"
        },
      },
      response_id:{
        type: Sequelize.INTEGER,
        references :{
          model: 'responses',
          key: "id"
        },
        
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
    return queryInterface.dropTable('feed_responses');
  }
};