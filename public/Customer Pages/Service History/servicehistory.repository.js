"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHistoryRepository = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../models/index");
class ServiceHistoryRepository {
    getSRDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: srId }, include: ["ServiceRequestAddress", "ExtraService"], });
        });
    }
    getSRHistoryOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { UserId: userId, Status: { [sequelize_1.Op.or]: [3, 4] } }, });
        });
    }
    getUser_DetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId } });
        });
    }
    ;
    Input_Ratings(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.create(ratings);
        });
    }
    FetchRatingsBySR_Id(serviceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findOne({ where: { ServiceRequestId: serviceRequestId } });
        });
    }
}
exports.ServiceHistoryRepository = ServiceHistoryRepository;
