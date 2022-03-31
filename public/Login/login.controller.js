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
exports.LoginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
        this.confirmLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.loginService
                .getUserByEmail(req.body.Email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user && user.IsActive) {
                    const registered = this.loginService.CheckisRegistered(user);
                    if (registered) {
                        const Confirm = yield bcrypt_1.default.compare(req.body.Password, user.Password);
                        if (Confirm) {
                            const token = this.loginService.createToken(user.Email);
                            if (user.UserTypeId === 4) {
                                return res
                                    .status(200).cookie("token", token, { expires: new Date(Date.now() + 600000), httpOnly: true })
                                    .json({ message: "login successful as customer" });
                            }
                            else if (user.UserTypeId === 3) {
                                return res.status(200).cookie("token", token, { expires: new Date(Date.now() + 600000), httpOnly: true })
                                    .json({ message: "login successful as Service provider" });
                            }
                            else if (user.UserTypeId === 1) {
                                return res
                                    .status(200).cookie("token", token, { expires: new Date(Date.now() + 600000), httpOnly: true })
                                    .json({ message: "login successful as super user" });
                            }
                            else {
                                return res
                                    .status(200).cookie("token", token, { expires: new Date(Date.now() + 600000), httpOnly: true })
                                    .json({ message: "login successful as admin" });
                            }
                        }
                        return res
                            .status(401)
                            .json({ message: "Invalid Username or Password" });
                    }
                    return res.json({ message: "Register your account" });
                }
                return res
                    .status(401)
                    .json({ message: "Invalid Username or Password" });
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.authenticateToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('x-auth');
            if (token == null) {
                return res.status(401).json({ message: "invalid login credential null" });
            }
            jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json({ message: 'invalid login credential' });
                }
                else {
                    // console.log(user);
                    req.body.email = user.userEmail;
                    return this.loginService.getUserByEmail(user.userEmail)
                        .then(user => {
                        if (user === null) {
                            return res.status(401).json({ message: 'Unauthorised user' });
                        }
                        else {
                            req.body.userId = user.UserId;
                            req.body.userTypeId = user.UserTypeId;
                            next();
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            error: error,
                        });
                    });
                }
            });
        });
        this.loginService = loginService;
    }
}
exports.LoginController = LoginController;
