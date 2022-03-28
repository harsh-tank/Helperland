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
exports.UserManagementService = void 0;
class UserManagementService {
    constructor(userManagementRepository) {
        this.userManagementRepository = userManagementRepository;
        this.userManagementRepository = userManagementRepository;
    }
    UserType_in_String(typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let US_String;
            if (typeId === null) {
                US_String = null;
            }
            else if (typeId === 1) {
                US_String = 'Super User';
            }
            else if (typeId === 2) {
                US_String = 'Admin';
            }
            else if (typeId === 3) {
                US_String = 'Service Provider';
            }
            else if (typeId === 4) {
                US_String = 'Customer';
            }
            else {
                US_String = 'Invalid Status';
            }
            return US_String;
        });
    }
    make_user_active(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userManagementRepository.getUserInfoById(+us_Id);
            if (result) {
                if (result.IsActive) {
                    return null;
                }
                else {
                    const active_now = yield this.userManagementRepository.make_user_active(+us_Id);
                    return active_now;
                }
            }
            else {
                return null;
            }
        });
    }
    make_user_inactive(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userManagementRepository.getUserInfoById(+userId);
            if (result) {
                if (result.IsActive) {
                    const inactive_now = yield this.userManagementRepository.make_user_inactive(+userId);
                    return inactive_now;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let Print_datas = [];
            const result = yield this.userManagementRepository.getAllUsers();
            if (result && result.length > 0) {
                for (let us in result) {
                    const userType = yield this.UserType_in_String(result[us].UserTypeId);
                    Print_datas.push({
                        UserId: result[us].UserId,
                        Name: result[us].FirstName + " " + result[us].LastName,
                        DateOfRegistration: result[us].createdAt.toLocaleDateString(),
                        UserType: userType,
                        Phone: result[us].Mobile,
                        PostalCode: result[us].ZipCode,
                        Status: result[us].IsActive
                    });
                }
                const formated_data = Print_datas.sort(function (a, b) {
                    return a.UserId - b.UserId;
                });
                return formated_data;
            }
            else {
                return null;
            }
        });
    }
}
exports.UserManagementService = UserManagementService;
