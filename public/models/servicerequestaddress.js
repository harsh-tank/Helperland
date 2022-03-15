"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestAddressModelAttributes = exports.ServiceRequestAddress = void 0;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestAddress.init({
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Type: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestAddress',
//   });
//   return ServiceRequestAddress;
// };
const sequelize_1 = require("sequelize");
class ServiceRequestAddress extends sequelize_1.Model {
}
exports.ServiceRequestAddress = ServiceRequestAddress;
;
exports.ServiceRequestAddressModelAttributes = {
    Id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    AddressLine1: {
        type: sequelize_1.DataTypes.STRING
    },
    AddressLine2: {
        type: sequelize_1.DataTypes.STRING
    },
    City: {
        type: sequelize_1.DataTypes.STRING
    },
    State: {
        type: sequelize_1.DataTypes.STRING
    },
    PostalCode: {
        type: sequelize_1.DataTypes.STRING
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    },
    Type: {
        type: sequelize_1.DataTypes.INTEGER
    },
};
