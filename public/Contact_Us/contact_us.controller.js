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
class Contact_UsController {
    constructor(contact_usService) {
        this.contact_usService = contact_usService;
        this.getContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .getContact_Us()
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.createContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            req.body.UploadFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
            req.body.Filepath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
            return this.contact_usService
                .createContact_Us(req.body)
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
        this.authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
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
                                        return res
                                            .status(401)
                                            .json({ message: "user not exist" });
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
                        return res
                            .status(401)
                            .json({ message: "You are already registered , plz login and try again" });
                    }
                }
                else {
                    next();
                }
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.contact_usService = contact_usService;
    }
}
exports.Contact_UsController = Contact_UsController;
