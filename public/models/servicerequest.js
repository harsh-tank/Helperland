"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestModelAttributes = exports.ServiceRequest = void 0;
const sequelize_1 = require("sequelize");
class ServiceRequest extends sequelize_1.Model {
}
exports.ServiceRequest = ServiceRequest;
;
exports.ServiceRequestModelAttributes = {
    ServiceRequestId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    ServiceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ServiceStartDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    ServiceStartTime: {
        allowNull: false,
        type: sequelize_1.DataTypes.TIME
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ServiceHourlyRate: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    ServiceHours: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    ExtraHours: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    SubTotal: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    Discount: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    TotalCost: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING,
    },
    PaymentTransactionRefNo: {
        type: sequelize_1.DataTypes.STRING,
    },
    PaymentDue: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    SPAcceptedDate: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
    HasPets: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    RefundedAmount: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    Distance: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    HasIssue: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    PaymentDone: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    RecordVersion: {
        type: sequelize_1.DataTypes.UUID,
    },
};
