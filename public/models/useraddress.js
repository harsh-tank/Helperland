"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressModelAttributes = exports.UserAddress = void 0;
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
const sequelize_1 = require("sequelize");
class UserAddress extends sequelize_1.Model {
}
exports.UserAddress = UserAddress;
;
exports.UserAddressModelAttributes = {
    AddressId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    AddressLine1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    AddressLine2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    City: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    State: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    PostalCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    IsDefault: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    Type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
};
