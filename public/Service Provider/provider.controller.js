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
exports.ProviderController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
const UserTypeId = 3;
const salt = 10;
class ProviderController {
    constructor(providerService) {
        this.providerService = providerService;
        this.createProvider = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.UserTypeId = UserTypeId;
            req.body.IsRegisteredUser = true;
            //console.log(req.body);
            req.body.IsActive = false;
            const Confirm = req.body.Password === req.body.Confirm_Password;
            if (!Confirm) {
                return res.json({ message: "Passwords are different" });
            }
            else {
                return this.providerService
                    .getProviderByEmail(req.body.Email)
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        return res
                            .status(303)
                            .json({ message: "Email already Exist" });
                    }
                    req.body.Password = yield bcrypt_1.default.hash(req.body.Password, salt);
                    return this.providerService
                        .createProvider(req.body)
                        .then((user) => {
                        const data = this.providerService.createData(user.Email);
                        mg.messages().send(data, function (error, body) {
                            if (error) {
                                return res.json({
                                    error: error.message,
                                });
                            }
                        });
                        return res
                            .status(200)
                            .json({
                            message: "Email sent as your registeration confirms, Check Email in Spam Folder",
                        });
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            error: error,
                        });
                    });
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json(error);
                });
            }
        });
        this.providerService = providerService;
    }
}
exports.ProviderController = ProviderController;
