"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeUserModelAttributes = exports.SubscribeUser = void 0;
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
const sequelize_1 = require("sequelize");
class SubscribeUser extends sequelize_1.Model {
}
exports.SubscribeUser = SubscribeUser;
;
exports.SubscribeUserModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    IsConfirmedSubscriber: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
};
