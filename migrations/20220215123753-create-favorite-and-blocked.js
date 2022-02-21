'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FavoriteAndBlocked', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      TargetUserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      IsFavorite: {
        type: Sequelize.BOOLEAN
      },
      Isblocked: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('FavoriteAndBlocked');
  }
};