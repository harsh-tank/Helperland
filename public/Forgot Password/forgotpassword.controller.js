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
exports.ForgotPasswordController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
const salt = 10;
class ForgotPasswordController {
    constructor(forgotpasswordService) {
        this.forgotpasswordService = forgotpasswordService;
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Email = req.body.Email;
            if (Email) {
                return this.forgotpasswordService
                    .getUserByEmail(Email)
                    .then((user) => {
                    if (!user) {
                        return res.status(400)
                            .json({ message: "User does not exist" });
                    }
                    const Link = this.forgotpasswordService.createToken(user.Email);
                    const temp = this.forgotpasswordService.createData(user.Email, Link);
                    mg.messages().send(temp, function (error, body) {
                        if (error) {
                            return res.json({
                                error: error.message,
                            });
                        }
                    });
                    return res.status(200).json({
                        message: "An email with a link to reset-password is send to your email",
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json(error);
                });
            }
            else {
                return res.status(400).json({ message: "Not Working" });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resetLink = req.body.resetLink;
            if (resetLink) {
                jsonwebtoken_1.default.verify(resetLink, process.env.FORGOT_PASSWORD, (error, decodedlink) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "Incorrect or expired token" });
                    }
                    const Same = req.body.changedPassword === req.body.confirm_changedPassword;
                    if (!Same) {
                        return res.json({ message: "Changed & confirm Password does not match " });
                    }
                    else {
                        const userEmail = decodedlink.userEmail;
                        return this.forgotpasswordService
                            .getUserByEmail(userEmail)
                            .then((user) => __awaiter(this, void 0, void 0, function* () {
                            if (!user) {
                                return res
                                    .status(400)
                                    .json({ error: "User does not exist with this token" });
                            }
                            const Confirm = yield bcrypt_1.default.compare(req.body.changedPassword, user.Password);
                            if (Confirm) {
                                return res
                                    .status(200)
                                    .json({
                                    message: "You used the Same password.Choose different password",
                                });
                            }
                            else {
                                user.Password = yield bcrypt_1.default.hash(req.body.changedPassword, salt);
                                return this.forgotpasswordService
                                    .updateUser(user.Password, user.Email)
                                    .then((user) => {
                                    return res
                                        .status(200)
                                        .json({ message: "password successfully Updated", user });
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json(error);
                                });
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.status(400).json({ message: "something went wrong" });
            }
        });
        this.forgotpasswordService = forgotpasswordService;
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
