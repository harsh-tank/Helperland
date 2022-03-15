"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestExtraModelAttributes = exports.ServiceRequestExtra = void 0;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestExtra extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestExtra.init({
//     ServiceExtraId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestExtra',
//   });
//   return ServiceRequestExtra;
// };
const sequelize_1 = require("sequelize");
class ServiceRequestExtra extends sequelize_1.Model {
}
exports.ServiceRequestExtra = ServiceRequestExtra;
;
exports.ServiceRequestExtraModelAttributes = {
    ServiceRequestExtraId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    ServiceExtraId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
};
