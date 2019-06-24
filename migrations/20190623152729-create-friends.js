'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person: {
        type: Sequelize.INTEGER,
        references :{
          model: 'users',
          key: "id"
        },
      },
      other_person: {
        type: Sequelize.INTEGER,
        references :{
          model: 'users',
          key: "id"
        },
      },
      status: {
        type: Sequelize.ENUM('requested','accepted')
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
    return queryInterface.dropTable('friends');
  }
};