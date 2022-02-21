"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteAndBlockedModelAttributes = exports.FavoriteAndBlocked = void 0;
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
const sequelize_1 = require("sequelize");
class FavoriteAndBlocked extends sequelize_1.Model {
}
exports.FavoriteAndBlocked = FavoriteAndBlocked;
;
exports.FavoriteAndBlockedModelAttributes = {
    Id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    UserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId'
        },
        type: sequelize_1.DataTypes.INTEGER
    },
    TargetUserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId'
        },
        type: sequelize_1.DataTypes.INTEGER
    },
    IsFavorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    IsBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
};
