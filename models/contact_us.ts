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
  id!: number;

  Name!: string;

  Email!: string;

  SubjectType!: string;

  Subject?: string;

  PhoneNumber!: number;

  Message!: string;

  UploadFileName?: string;

  Filepath!: string;

  CreatedOn?: Date;

  Status?: number;

  Priority?: number;

  AssignedToUser?:number;

  IsDeleted?:number;

};

export const Contact_UsModelAttributes: ModelAttributes = {
  id: {
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
  SubjectType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Subject: {
    type: DataTypes.STRING
  },
  PhoneNumber: {
    type: DataTypes.BIGINT,
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
  CreatedOn: {
    type: DataTypes.DATE
  },
  
  Status: {
    type: DataTypes.INTEGER
  },
  Priority: {
    type: DataTypes.INTEGER
  },
  AssignedToUser: {
    type: DataTypes.INTEGER
  },
  IsDeleted: {
    type: DataTypes.INTEGER
  }
}