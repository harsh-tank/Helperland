"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.User = void 0;
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
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
;
exports.UserModelAttributes = {
    UserId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    UserTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Gender: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    UserProfilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    IsRegisteredUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    PaymentGatewayUserRef: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    WorksWithPets: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    LanguageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    NationalityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    IsApproved: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsActive: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    BankTokenId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    TaxNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
};
