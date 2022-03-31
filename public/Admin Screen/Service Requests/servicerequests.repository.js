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
exports.ServiceRequestsRepository = void 0;
const index_1 = require("../../models/index");
class ServiceRequestsRepository {
    reschedule_SR(date, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ ServiceStartDate: date, ServiceStartTime: body.ServiceTime, ModifiedBy: userId }, { where: { ServiceRequestId: body.ServiceRequestId } });
        });
    }
    getAllSR() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll();
        });
    }
    get_SR_Address(req_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: req_Id } });
        });
    }
    getRatings(us_Id, SPId, req_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findOne({ where: { RatingFrom: us_Id, RatingTo: SPId, ServiceRequestId: req_Id } });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: email } });
        });
    }
    getUserInfoById(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: us_Id } });
        });
    }
    getSRById(req_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: req_Id } });
        });
    }
    upd_SR_Add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.update({
                AddressLine1: body.AddressLine1, AddressLine2: body.AddressLine2,
                City: body.City, PostalCode: body.PostalCode
            }, { where: { ServiceRequestId: body.ServiceRequestId } });
        });
    }
    getSRDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: srId, Status: 3 } });
        });
    }
    upd_SR(req_Id, us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 4, ModifiedBy: us_Id }, { where: { ServiceRequestId: req_Id } });
        });
    }
    Return_refund(srId, rf, us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ RefundedAmount: rf, Status: 5, ModifiedBy: us_Id }, { where: { ServiceRequestId: srId } });
        });
    }
}
exports.ServiceRequestsRepository = ServiceRequestsRepository;
