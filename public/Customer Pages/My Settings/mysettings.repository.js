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
exports.MySettingsRepository = void 0;
const index_1 = require("../../models/index");
class MySettingsRepository {
    get_User_AddById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findAll({ where: { UserId: userId, IsDeleted: false } });
        });
    }
    get_User_AddByAdd_Id(addressId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { AddressId: addressId, UserId: userId } });
        });
    }
    update_User_AddByAdd_Id(addressId, userId, userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.update({ Addressline1: userAddress.AddressLine1, Addressline2: userAddress.AddressLine2, PostalCode: userAddress.PostalCode,
                City: userAddress.City, Mobile: userAddress.Mobile }, { where: { AddressId: addressId, UserId: userId } });
        });
    }
    get_User_DetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId, UserTypeId: 4 } });
        });
    }
    update_User_DetailById(userId, up_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ FirstName: up_user.FirstName, LastName: up_user.LastName, Mobile: up_user.Mobile,
                DateOfBirth: up_user.DateOfBirth, LanguageId: up_user.LanguageId, ModifiedBy: userId }, { where: { UserId: userId } });
        });
    }
    get_User_ById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId } });
        });
    }
    create_Add(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create(userAddress);
        });
    }
    delete_Add(addressId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.update({ IsDeleted: true }, { where: { AddressId: addressId, UserId: userId } });
        });
    }
    change_Pass(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ Password: password, ModifiedBy: userId }, { where: { UserId: userId } });
        });
    }
}
exports.MySettingsRepository = MySettingsRepository;
