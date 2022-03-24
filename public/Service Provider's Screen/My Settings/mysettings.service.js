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
    get_User_Detail_ById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let Print_data = {};
            const result = yield this.mySettingsRepository.get_User_Detail_ById(userId);
            const add = yield this.mySettingsRepository.get_User_Add_ById(userId);
            if (result) {
                Print_data = {
                    Status: result.Status,
                    BasicDetails: { FirstName: result.FirstName, LastName: result.LastName,
                        EmailAddress: result.Email, PhoneNumber: result.Mobile,
                        DateOfBirth: result.DateOfBirth, Nationality: result.NationalityId,
                        Gender: result.Gender, ProfilePicture: result.UserProfilePicture, },
                    Address: { StreetName: add === null || add === void 0 ? void 0 : add.AddressLine1, HouseNumber: add === null || add === void 0 ? void 0 : add.AddressLine2,
                        PostalCode: add === null || add === void 0 ? void 0 : add.PostalCode, City: add === null || add === void 0 ? void 0 : add.City }
                };
            }
            return Print_data;
        });
    }
    get_Provider_Add_ById(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_Provider_Add_ById(ProviderId);
        });
    }
    FormatDate(dateSt) {
        const Format_St = dateSt.toString().split('-').reverse().join('-');
        const Valid_date = new Date(Format_St);
        return Valid_date;
    }
    create_Add(add_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.create_Add(add_Id, user);
        });
    }
    update_User_Add(add_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.update_User_Add(add_Id, user);
        });
    }
    get_User_ById(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.get_User_ById(+us_Id);
        });
    }
    change_Pass(us_Id, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.change_Pass(+us_Id, pass);
        });
    }
    update_User_DetailById(us_Id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.Gender === "Male") {
                user.GenderId = 1;
            }
            else if (user.Gender === "Female") {
                user.GenderId = 2;
            }
            else {
                user.GenderId = 3;
            }
            return this.mySettingsRepository.update_User_DetailById(+us_Id, user);
        });
    }
}
exports.MySettingsService = MySettingsService;
