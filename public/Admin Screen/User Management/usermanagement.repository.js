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
exports.UserManagementRepository = void 0;
const index_1 = require("../../models/index");
const sequelize_1 = require("sequelize");
class UserManagementRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: { [sequelize_1.Op.or]: [3, 4] } } });
        });
    }
    make_user_active(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ IsActive: true }, { where: { UserId: userId } });
        });
    }
    make_user_inactive(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ IsActive: false }, { where: { UserId: userId } });
        });
    }
    getUserInfoById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId, UserTypeId: { [sequelize_1.Op.or]: [3, 4] } } });
        });
    }
}
exports.UserManagementRepository = UserManagementRepository;
