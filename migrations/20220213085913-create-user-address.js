'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAddress', {
      AddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        type: Sequelize.INTEGER
      },
      AddressLine1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      AddressLine2: {
        type: Sequelize.STRING
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      PostalCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      IsDefault: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Mobile: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Type: {
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
    await queryInterface.dropTable('UserAddress');
  }
};