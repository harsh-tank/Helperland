"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModelAttributes = exports.Rating = void 0;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Rating.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     RatingFrom: DataTypes.INTEGER,
//     RatingTo: DataTypes.INTEGER,
//     Ratings: DataTypes.DECIMAL,
//     Comments: DataTypes.STRING,
//     RatingDate: DataTypes.DATE,
//     OnTimeArrival: DataTypes.DECIMAL,
//     Friendly: DataTypes.DECIMAL,
//     QualityOfService: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Rating',
//   });
//   return Rating;
// };
const sequelize_1 = require("sequelize");
class Rating extends sequelize_1.Model {
}
exports.Rating = Rating;
exports.RatingModelAttributes = {
    RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Ratings: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING(2000)
    },
    RatingDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATEONLY
    },
    OnTimeArrival: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Friendly: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    QualityOfService: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
};
