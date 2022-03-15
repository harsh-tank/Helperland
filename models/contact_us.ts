// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Contact_Us extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Contact_Us.init({
//     Name: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     SubjectType: DataTypes.STRING,
//     Subject: DataTypes.STRING,
//     PhoneNumber: DataTypes.BIGINT,
//     Message: DataTypes.STRING,
//     UploadFileName: DataTypes.STRING,
//     Filepath: DataTypes.STRING,
//     CreatedOn: DataTypes.DATE,
//     Status: DataTypes.INTEGER,
//     Priority: DataTypes.INTEGER,
//     AssignedToUser: DataTypes.INTEGER,
//     IsDeleted: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Contact_Us',
//   });
//   return Contact_Us;
// };
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Contact_Us extends Model {
  Contact_UsId!: number;

  Name!: string;

  Email!: string;

  Subject?: string;

  PhoneNumber!: string;

  Message!: string;

  UploadFileName?: string;

  Filepath?: string;

  CreatedBy?: number;

};

export const Contact_UsModelAttributes: ModelAttributes = {
  Contact_UsId: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  Subject: {
    type: DataTypes.STRING
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UploadFileName: {
    type: DataTypes.STRING
  },
  Filepath: {
    type: DataTypes.STRING
  },
  CreatedBy: {
    type: DataTypes.INTEGER
  },
}