// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UserAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserAddress.init({
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     IsDefault: DataTypes.BOOLEAN,
//     IsDeleted: DataTypes.BOOLEAN,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Type: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'UserAddress',
//   });
//   return UserAddress;
// };
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class UserAddress extends Model {
    AddressId!: number;

    AddressLine1!: string;

    AddressLine2?: string;

    City!: string;

    State?: string;

    PostalCode!: string;

    IsDefault!: boolean;

    IsDeleted!: boolean;

    Mobile?: string;

    Email?: string;

    Type?: number
};

export const UserAddressModelAttributes: ModelAttributes = {
    AddressId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    AddressLine1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AddressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
        allowNull: true
    },
    PostalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IsDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}