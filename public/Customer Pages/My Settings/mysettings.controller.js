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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class MySettingsController {
    constructor(mySettingsService) {
        this.mySettingsService = mySettingsService;
        this.get_User_AddById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const UserId = +req.body.userId;
            if (UserId && req.body.userTypeId === 4) {
                return this.mySettingsService.get_User_AddById(UserId)
                    .then(user_Add => {
                    if (user_Add) {
                        return res.status(200).json(user_Add);
                    }
                    else {
                        return res.status(404).json({ message: 'No address Available' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.get_User_AddByAdd_Id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const add_Id = +req.params.addressId;
            if (add_Id && req.body.userTypeId === 4) {
                return this.mySettingsService.get_User_AddByAdd_Id(add_Id, req.body.userId)
                    .then(user_Add => {
                    if (user_Add) {
                        return res.status(200).json(user_Add);
                    }
                    else {
                        return res.status(404).json({ message: 'No address found' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.update_User_AddByAdd_Id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.params.addressId && req.body.userTypeId === 4) {
                req.body.Addressline1 = req.body.StreetName;
                req.body.Addressline2 = req.body.HouseNumber;
                return this.mySettingsService.update_User_AddByAdd_Id(req.params.addressId, req.body.userId, req.body)
                    .then(up_Add => {
                    if (up_Add) {
                        if (up_Add[0] === 1) {
                            return res.status(201).json({ message: 'Address is Updated' });
                        }
                        else {
                            return res.status(422).json({ message: 'Error while updating' });
                        }
                    }
                    else {
                        return res.status(422).json({ message: 'Error while updating' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.get_User_DetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const U_Id = +req.body.userId;
            if (U_Id && req.body.userTypeId === 4) {
                return this.mySettingsService.get_User_DetailById(U_Id)
                    .then((u_Detail) => {
                    if (u_Detail) {
                        return res.status(200).json(u_Detail);
                    }
                    else {
                        return res.status(404).json({ message: 'No User Found With Given ID' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.update_User_DetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 4) {
                const UserId = +req.body.userId;
                req.body.DateOfBirth = this.mySettingsService.FormatDate(req.body.DateOfBirth);
                return this.mySettingsService.update_User_DetailById(UserId, req.body)
                    .then(up_User => {
                    if (up_User) {
                        return res.status(200).json(up_User);
                    }
                    else {
                        return res.status(500).json({ message: 'Error while updating' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.create_Add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.IsDefault = false;
            req.body.IsDeleted = false;
            if (req.body.userId && req.body.userTypeId === 4) {
                req.body.UserId = req.body.userId;
                req.body.Addressline1 = req.body.StreetName;
                req.body.Addressline2 = req.body.HouseNumber;
                req.body.Email = req.body.email;
                return this.mySettingsService.create_Add(req.body)
                    .then(cre_Add => {
                    if (cre_Add) {
                        return res.status(200).json({ message: 'address created successfully' });
                    }
                    else {
                        return res.status(422).json({ message: 'error while creating address' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.delete_Add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.params.addressId && req.body.userTypeId === 4) {
                return this.mySettingsService.delete_Add(req.params.addressId, req.body.userId)
                    .then(del_Add => {
                    if (del_Add) {
                        if (del_Add[0] === 1) {
                            return res.status(200).json({ message: 'address is deleted' });
                        }
                        else {
                            return res.status(404).json({ message: 'error while deleting' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'error while deleting' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.change_Pass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 4) {
                return this.mySettingsService.get_User_ById(req.body.userId)
                    .then((ex_us) => __awaiter(this, void 0, void 0, function* () {
                    if (ex_us) {
                        const confirm = yield bcrypt_1.default.compare(req.body.Old_Password, ex_us.Password);
                        if (confirm) {
                            if (req.body.New_Password === req.body.Confirm_Password) {
                                const hashedPassword = yield bcrypt_1.default.hash(req.body.New_Password, 10);
                                return this.mySettingsService.change_Pass(req.body.userId, hashedPassword)
                                    .then(change_Pass => {
                                    if (change_Pass) {
                                        if (change_Pass[0] === 1) {
                                            return res.status(200).json({ message: 'password is changed now' });
                                        }
                                        else {
                                            return res.status(404).json({ message: 'error while changing password' });
                                        }
                                    }
                                    else {
                                        return res.status(404).json({ message: 'error while changing password' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json({ message: 'New Password and Confirm Password should match' });
                            }
                        }
                        else {
                            return res.status(400).json({ message: 'Incorrect old password' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'No user found' });
                    }
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'Invalid Input' });
            }
        });
        this.mySettingsService = mySettingsService;
    }
}
exports.MySettingsController = MySettingsController;
