'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eid:{
        type: Sequelize.INTEGER,
        references:{
          model: "quizzes",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      email: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      right: {
        type: Sequelize.INTEGER
      },
      wrong: {
        type: Sequelize.INTEGER
      },
      trieddate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('histories');
  }
};