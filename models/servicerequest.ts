// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequest extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequest.init({
//     ServiceId: DataTypes.INTEGER,
//     ServiceStartDate: DataTypes.DATE,
//     ZipCode: DataTypes.STRING,
//     ServiceFrequency: DataTypes.SMALLINT,
//     ServiceHourlyRate: DataTypes.DECIMAL,
//     ServiceHours: DataTypes.FLOAT,
//     ExtraHours: DataTypes.FLOAT,
//     SubTotal: DataTypes.DECIMAL,
//     Discount: DataTypes.DECIMAL,
//     TotalCost: DataTypes.DECIMAL,
//     Comments: DataTypes.STRING,
//     PaymentTransactionRefNo: DataTypes.STRING,
//     PaymentDue: DataTypes.BOOLEAN,
//     JobStatus: DataTypes.SMALLINT,
//     SPAcceptedDate: DataTypes.DATE,
//     HasPets: DataTypes.BOOLEAN,
//     Status: DataTypes.INTEGER,
//     ModifiedBy: DataTypes.INTEGER,
//     RefundedAmount: DataTypes.DECIMAL,
//     Distance: DataTypes.DECIMAL,
//     HasIssue: DataTypes.BOOLEAN,
//     PaymentDone: DataTypes.BOOLEAN,
//     RecordVersion: DataTypes.UUID
//   }, {
//     sequelize,
//     modelName: 'ServiceRequest',
//   });
//   return ServiceRequest;
// };
import { UUIDVersion } from 'express-validator/src/options';
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequest extends Model {
    ServiceRequestId!: number;
    
    UserId!: number;

    ServiceId!: number;

    ServiceStartDate!: Date;

    ServiceStartTime!:number;

    ZipCode!: string;

    ServiceHourlyRate?: number;

    ServiceHours!: number;

    ExtraHours!: number;

    SubTotal!: number;

    Discount?: number;

    TotalCost!: number;

    Comments?: string;

    PaymentTransactionRefNo?: string;

    PaymentDue!: boolean;

    ServiceProviderId!: number;

    SPAcceptedDate?: Date;

    HasPets!: boolean;

    Status?: number;

    ModifiedBy?: number;

    RefundedAmount?: number;

    Distance?: number;

    HasIssue?:  boolean;

    PaymentDone?: boolean;

    RecordVersion?: UUIDVersion;
};

export const ServiceRequestModelAttributes: ModelAttributes = {
    ServiceRequestId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ServiceStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      ServiceStartTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      ZipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ServiceHourlyRate: {
        type: DataTypes.DECIMAL,
      },
      ServiceHours: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      ExtraHours: {
        type: DataTypes.FLOAT,
      },
      SubTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }, 
      Discount: {
        type: DataTypes.DECIMAL,
      },
      TotalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      Comments: {
        type: DataTypes.STRING,
      },
      PaymentTransactionRefNo: {
        type: DataTypes.STRING,
      },
      PaymentDue: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      SPAcceptedDate: {
        type: DataTypes.DATEONLY,
      },
      HasPets: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      Status: {
        type: DataTypes.INTEGER,
      },
      ModifiedBy: {
        type: DataTypes.INTEGER,
      },
      RefundedAmount: {
        type: DataTypes.DECIMAL,
      },
      Distance: {
        type: DataTypes.DECIMAL,
      },
      HasIssue: {
        type: DataTypes.BOOLEAN,
      },
      PaymentDone: {
        type: DataTypes.BOOLEAN,
      },
      RecordVersion: {
        type: DataTypes.UUID,
      },
}