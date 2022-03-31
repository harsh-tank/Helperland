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
exports.Contact_UsController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class Contact_UsController {
    constructor(contact_usService) {
        this.contact_usService = contact_usService;
        this.createContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // console.log(req.file);
            const f_Name = req.body.FirstName;
            const l_Name = req.body.LastName;
            const Full_Name = f_Name + " " + l_Name;
            req.body.UploadFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
            req.body.Filepath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
            req.body.Name = Full_Name;
            return this.contact_usService
                .createContact_Us(req.body)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                const ad_Emails = yield this.contact_usService.admin_Emails();
                if (ad_Emails.length > 0) {
                    for (let e in ad_Emails) {
                        const data = this.contact_usService.Send_Email(ad_Emails[e], Full_Name, req.body.Email, req.body.Subject, req.body.PhoneNumber, req.body.Message);
                        mg.messages().send(data, (error, body) => {
                            if (error) {
                                return res.json({ error: error.message });
                            }
                        });
                    }
                }
                return res.status(200).json({ user });
            }))
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService.getContact_Us()
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContact_UsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .getContact_UsById(+req.params.id)
                .then((user) => {
                if (user) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .updateContact_Us(req.body, +req.params.id)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .deleteContact_Us(+req.params.id)
                .then((user) => {
                if (user > 0) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.validated_by = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('x-auth');
            return this.contact_usService
                .getUserByEmail(req.body.Email)
                .then((user) => {
                if (user) {
                    if (token) {
                        jsonwebtoken_1.default.verify(token, process.env.SECRET, (error, user) => {
                            if (error) {
                                return res.status(303).json({ message: "invalid credentials" });
                            }
                            else {
                                return this.contact_usService
                                    .getUserByEmail(user.userEmail)
                                    .then((user) => {
                                    if (user === null) {
                                        return res.status(401).json({ message: "No user found" });
                                    }
                                    req.body.CreatedBy = user.UserId;
                                    next();
                                })
                                    .catch((error) => {
                                    return res.status(500).json({
                                        error: error,
                                    });
                                });
                            }
                        });
                    }
                    else {
                        return res.status(401).json({ message: "You are already registered , plz login and try again" });
                    }
                }
                else {
                    next();
                }
            })
                .catch((error) => {
                return res.status(500).json({ error: error, });
            });
        });
        this.contact_usService = contact_usService;
    }
}
exports.Contact_UsController = Contact_UsController;
