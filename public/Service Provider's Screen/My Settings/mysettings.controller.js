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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class MySettingsController {
    constructor(mySettingsService) {
        this.mySettingsService = mySettingsService;
        this.update_User_DetailById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 3) {
                req.body.DateOfBirth = this.mySettingsService.FormatDate(req.body.DateOfBirth);
                return this.mySettingsService.update_User_DetailById(req.body.userId, req.body)
                    .then(upd_User => {
                    if (upd_User) {
                        next();
                    }
                    else {
                        return res.status(422).json({ message: 'error While updating' });
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
        this.get_User_Detail_ById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Us_Id = +req.body.userId;
            if (Us_Id && req.body.userTypeId === 3) {
                return this.mySettingsService.get_User_Detail_ById(Us_Id)
                    .then((user_Info) => {
                    if (user_Info) {
                        return res.status(200).json(user_Info);
                    }
                    else {
                        return res.status(404).json({ message: 'Info Not Found' });
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
            if (req.body.userId && req.body.userTypeId === 3) {
                return this.mySettingsService.get_User_ById(req.body.userId)
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result) {
                        const confirm = yield bcrypt_1.default.compare(req.body.Old_Password, result.Password);
                        if (confirm) {
                            if (req.body.New_Password === req.body.Confirm_Password) {
                                const hashedPassword = yield bcrypt_1.default.hash(req.body.New_Password, 10);
                                return this.mySettingsService.change_Pass(req.body.userId, hashedPassword)
                                    .then(upd_Pass => {
                                    if (upd_Pass) {
                                        if (upd_Pass[0] === 1) {
                                            return res.status(200).json({ message: 'password is changed now' });
                                        }
                                        else {
                                            return res.status(404).json({ message: 'error while changing pass' });
                                        }
                                    }
                                    else {
                                        return res.status(404).json({ message: 'error while changing pass' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json({ message: 'New & Confirm Password should match' });
                            }
                        }
                        else {
                            return res.status(400).json({ message: 'Wrong old pass' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'No User Found' });
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
        this.Create_Or_Upd_Add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Us_Id = +req.body.userId;
            if (Us_Id && req.body.userTypeId === 3) {
                return this.mySettingsService.get_Provider_Add_ById(Us_Id)
                    .then(user_Add => {
                    if (user_Add) {
                        return this.mySettingsService.update_User_Add(user_Add.AddressId, req.body)
                            .then(upd_Add => {
                            if (upd_Add) {
                                return res.status(200).json({ message: 'Address Updated Successfully' });
                            }
                            else {
                                return res.status(422).json({ message: 'error while updating' });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return this.mySettingsService.create_Add(Us_Id, req.body)
                            .then(address => {
                            if (address) {
                                return res.status(200).json(address);
                            }
                            else {
                                return res.status(500).json({ message: 'error while creating' });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
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
        this.mySettingsService = mySettingsService;
    }
}
exports.MySettingsController = MySettingsController;
