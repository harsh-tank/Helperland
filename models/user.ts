// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Password: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     UserTypeId: DataTypes.INTEGER,
//     Gender: DataTypes.INTEGER,
//     DateOfBirth: DataTypes.DATE,
//     UserProfilePicture: DataTypes.STRING,
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     PaymentGatewayUserRef: DataTypes.STRING,
//     ZipCode: DataTypes.STRING,
//     WorksWithPets: DataTypes.BOOLEAN,
//     LanguageId: DataTypes.INTEGER,
//     NationalityId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model {
   UserId!: number;

   FirstName!: string;

   LastName!: string;

   Email!: string;

   Password!: string;

   Mobile!: string;

   UserTypeId!: number;

   Gender?: number;

   DateOfBirth?: Date;

   UserProfilePicture?: string;

   IsRegisteredUser!: boolean;

   PaymentGatewayUserRef?: string;

   ZipCode?: string;

   WorksWithPets?: boolean;

   LanguageId?: number;

   NationalityId?: number;

   ModifiedBy?: number;

   IsApproved?: boolean;

   IsActive?: boolean;

   IsDeleted?: boolean;

   Status?: number;

   BankTokenId?: string;

   TaxNo?: string;

};

export const UserModelAttributes: ModelAttributes = {
   UserId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    UserProfilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsRegisteredUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    PaymentGatewayUserRef: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ZipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WorksWithPets: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    LanguageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    NationalityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER
    },
    IsApproved: {
      type: DataTypes.BOOLEAN
    },
    IsActive: {
      type: DataTypes.BOOLEAN
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN
    },
    Status: {
      type: DataTypes.INTEGER,
    },
    BankTokenId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaxNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
}