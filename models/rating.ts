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
import { Model, DataTypes} from 'sequelize';

export class Rating extends Model
{
  RatingId!:number;

  ServiceRequestId!: number;

  RatingFrom!: number;

  RatingTo!: number;

  Ratings!: number;

  Comments?: string;

  RatingDate!: Date;

  OnTimeArrival!: number;

  Friendly!: number;

  QualityOfService!: number

}

export const RatingModelAttributes={
  RatingId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  Ratings: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
  Comments: {
    type: DataTypes.STRING(2000)
  },
  RatingDate: {
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  OnTimeArrival: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
  Friendly: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
  QualityOfService: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
}