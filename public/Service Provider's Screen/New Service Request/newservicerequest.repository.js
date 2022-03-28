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
exports.ServiceRequestRepository = void 0;
const index_1 = require("../../models/index");
class ServiceRequestRepository {
    getServiceRequestById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: requestId, Status: 1 } });
        });
    }
    getServiceRequestAddress(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: requestId } });
        });
    }
    getCustomerDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId, UserTypeId: 4 } });
        });
    }
    getServiceProviderDetailById(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: ProviderId, UserTypeId: 3 } });
        });
    }
    getAllServiceRequestsOfProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ProviderId, Status: 2 } });
        });
    }
    getAllUnAcceptedServiceRequestByZipcode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ZipCode: zipCode, Status: 1 } });
        });
    }
    getAllBlockedCustomerOfServiceProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: ProviderId, IsBlocked: true } });
        });
    }
    acceptNewSR(ser_Id, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ ServiceProviderId: ProviderId, Status: 2,
                ModifiedBy: ProviderId, SPAcceptedDate: new Date() }, { where: { ServiceRequestId: ser_Id } });
        });
    }
    getServiceProvidersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { ZipCode: zipCode, UserTypeId: 3 } });
        });
    }
}
exports.ServiceRequestRepository = ServiceRequestRepository;
