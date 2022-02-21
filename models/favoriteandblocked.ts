// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FavoriteAndBlocked extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FavoriteAndBlocked.init({
//     IsFavorite: DataTypes.BOOLEAN,
//     Isblocked: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'FavoriteAndBlocked',
//   });
//   return FavoriteAndBlocked;
// };
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class FavoriteAndBlocked extends Model {
    Id!: number;

    UserId!:number;

    TargetUserId!:number;

    IsFavorite!: boolean;

    IsBlocked!: boolean;
};

export const FavoriteAndBlockedModelAttributes: ModelAttributes = {

    Id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },

    UserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: DataTypes.INTEGER
      },

    TargetUserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: DataTypes.INTEGER
      },

    IsFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },

    IsBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
}