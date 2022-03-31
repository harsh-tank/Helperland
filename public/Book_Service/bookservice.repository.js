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
exports.BookServiceRepository = void 0;
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
class BookServiceRepository {
    createUserAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create(userAddress);
        });
    }
    createFavoriteAndBlocked(favoriteandblocked) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.create(favoriteandblocked);
        });
    }
    getFavoriteAndBlocked(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: userId } });
        });
    }
    getAllBlockCustOfProvider(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: { [sequelize_1.Op.or]: userId }, IsBlocked: true } });
        });
    }
    getUserAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findAll({ where: { UserId: userId } });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserId: userId } });
        });
    }
    getProviderById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId, UserTypeId: 3 } });
        });
    }
    getAllProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: 3 } });
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: userEmail } });
        });
    }
    getProviderByZipcode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: 3, ZipCode: zipCode } });
        });
    }
    getBlockedCustomerofProvider(userId, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: { [sequelize_1.Op.or]: ProviderId }, TargetUserId: userId, IsBlocked: true } });
        });
    }
    getAllBlockedProviderofUser(userId, ProviderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: userId, TargetUserId: { [sequelize_1.Op.or]: ProviderIds }, IsBlocked: true } });
        });
    }
    createServiceRequest(ServiceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.create(ServiceRequest);
        });
    }
    createServiceRequestWithAddress(ServiceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.create(ServiceRequest, { include: ['ServiceRequestAddress', 'ExtraService'] });
        });
    }
}
exports.BookServiceRepository = BookServiceRepository;
