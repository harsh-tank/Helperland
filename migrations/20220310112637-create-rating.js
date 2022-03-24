'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rating', {
      RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        allowNull: false,
        references: {
          model: 'ServiceRequest',
          key: 'ServiceRequestId'
      },
        type: Sequelize.INTEGER
      },
      RatingFrom: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
      },
        type: Sequelize.INTEGER
      },
      RatingTo: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
      },
        type: Sequelize.INTEGER
      },
      Ratings: {
        allowNull: false,
        type: Sequelize.DECIMAL(2,1)
      },
      Comments: {
        type: Sequelize.STRING(2000)
      },
      RatingDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      OnTimeArrival: {
        allowNull: false,
        type: Sequelize.DECIMAL(2,1)
      },
      Friendly: {
        allowNull: false,
        type: Sequelize.DECIMAL(2,1)
      },
      QualityOfService: {
        allowNull: false,
        type: Sequelize.DECIMAL(2,1)
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
    await queryInterface.dropTable('Rating');
  }
};