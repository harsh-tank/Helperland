'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contact_Us', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      SubjectType: {
        type: Sequelize.STRING
      },
      Subject: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.BIGINT
      },
      Message: {
        type: Sequelize.STRING
      },
      UploadFileName: {
        type: Sequelize.STRING
      },
      Filepath: {
        type: Sequelize.STRING
      },
      CreatedOn: {
        type: Sequelize.DATE
      },
      Status: {
        type: Sequelize.INTEGER
      },
      Priority: {
        type: Sequelize.INTEGER
      },
      AssignedToUser: {
        type: Sequelize.INTEGER
      },
      IsDeleted: {
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