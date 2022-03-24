'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contact_Us', {
      Contact_UsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Subject: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UploadFileName: {
        type: Sequelize.STRING
      },
      Filepath: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contact_Us');
  }
};