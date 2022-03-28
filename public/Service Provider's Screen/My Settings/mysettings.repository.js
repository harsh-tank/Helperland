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
    update_User_DetailById(us_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({
                FirstName: user.FirstName, LastName: user.LastName,
                Mobile: user.Mobile, DateOfBirth: user.DateOfBirth,
                NationalityId: user.NationalityId, Gender: user.GenderId,
                UserProfilePicture: user.ProfilePicture, ModifiedBy: us_Id,
                ZipCode: user.Address.PostalCode
            }, { where: { UserId: us_Id } });
        });
    }
    get_User_Detail_ById(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ attributes: { exclude: ['Password'] }, where: { UserId: us_Id, UserTypeId: 3 }, include: index_1.db.UserAddress });
        });
    }
    get_User_ById(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: us_Id } });
        });
    }
    get_Provider_Add_ById(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { UserId: ProviderId } });
        });
    }
    create_Add(us_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create({
                AddressLine1: user.Address.StreetName, AddressLine2: user.Address.HouseNumber,
                PostalCode: user.Address.PostalCode, City: user.Address.City,
                IsDefault: true, IsDeleted: false, UserId: us_Id
            });
        });
    }
    update_User_Add(add_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.update({
                AddressLine1: user.Address.StreetName, AddressLine2: user.Address.HouseNumber,
                PostalCode: user.Address.PostalCode, City: user.Address.City
            }, { where: { AddressId: add_Id } });
        });
    }
    get_User_Add_ById(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { UserId: us_Id, IsDeleted: false } });
        });
    }
    change_Pass(us_Id, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ Password: pass, ModifiedBy: us_Id }, { where: { UserId: us_Id } });
        });
    }
}
exports.MySettingsRepository = MySettingsRepository;
