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
exports.MySettingsService = void 0;
class MySettingsService {
    constructor(mySettingsRepository) {
        this.mySettingsRepository = mySettingsRepository;
        this.mySettingsRepository = mySettingsRepository;
    }
    ;
    get_User_AddById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_User_AddById(userId);
        });
    }
    get_User_AddByAdd_Id(addressId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_User_AddByAdd_Id(addressId, +userId);
        });
    }
    update_User_AddByAdd_Id(addressId, userId, userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.update_User_AddByAdd_Id(+addressId, +userId, userAddress);
        });
    }
    get_User_DetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_User_DetailById(userId);
        });
    }
    update_User_DetailById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.update_User_DetailById(userId, user);
        });
    }
    get_User_ById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_User_ById(+userId);
        });
    }
    create_Add(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.create_Add(userAddress);
        });
    }
    delete_Add(addressId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.delete_Add(+addressId, +userId);
        });
    }
    FormatDate(dateStr) {
        const St_Date = dateStr.toString().split('-').reverse().join('-');
        const D_Date = new Date(St_Date);
        return D_Date;
    }
    change_Pass(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.change_Pass(+userId, password);
        });
    }
}
exports.MySettingsService = MySettingsService;
