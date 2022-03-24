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
exports.BlockCustomerRepository = void 0;
const index_1 = require("../../models/index");
class BlockCustomerRepository {
    getCompletedSRofProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ProviderId, Status: 3 } });
        });
    }
    updateUnBlockedCustofProvider(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.update({ IsBlocked: false }, { where: { UserId: ProviderId, TargetUserId: custId } });
        });
    }
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId } });
        });
    }
    ;
    createBlockUnblockCust(blockCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.create(blockCustomer);
        });
    }
    getBlockedCustofSP(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findOne({ where: { UserId: ProviderId, TargetUserId: custId } });
        });
    }
    updateBlockedCustofSP(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.update({ IsBlocked: true }, { where: { UserId: ProviderId, TargetUserId: custId } });
        });
    }
}
exports.BlockCustomerRepository = BlockCustomerRepository;
