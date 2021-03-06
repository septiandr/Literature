'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('literature', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      publication_date: {
        type: Sequelize.DATE
      },
      pages: {
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable('literature');
  }
};