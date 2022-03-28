"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact_UsModelAttributes = exports.Contact_Us = void 0;
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
const sequelize_1 = require("sequelize");
class Contact_Us extends sequelize_1.Model {
}
exports.Contact_Us = Contact_Us;
;
exports.Contact_UsModelAttributes = {
    Contact_UsId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Subject: {
        type: sequelize_1.DataTypes.STRING
    },
    PhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    UploadFileName: {
        type: sequelize_1.DataTypes.STRING
    },
    Filepath: {
        type: sequelize_1.DataTypes.STRING
    },
    CreatedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
};
