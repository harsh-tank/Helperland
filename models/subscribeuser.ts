// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class SubscribeUser extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   SubscribeUser.init({
//     Email: DataTypes.STRING,
//     IsConfirmedSubscriber: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'SubscribeUser',
//   });
//   return SubscribeUser;
// };
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SubscribeUser extends Model {
  id!: number;
  
  Email!: string;

  IsConfirmedSubscriber!:boolean;
  
};

export const SubscribeUserModelAttributes: ModelAttributes = {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    IsConfirmedSubscriber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }