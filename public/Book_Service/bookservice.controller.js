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
exports.BookServiceController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
let email = [];
class BookServiceController {
    constructor(bookService) {
        this.bookService = bookService;
        this.confirmServiceAvailable = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.postalcode) {
                return res.status(400).json({ message: "Plz enter Zipcode" });
            }
            else {
                return this.bookService
                    .getAllProvider()
                    .then((provider) => {
                    let isAvailable;
                    if (provider) {
                        for (let p in provider) {
                            if (provider[p].ZipCode === req.body.postalcode) {
                                isAvailable = true;
                            }
                        }
                        if (isAvailable) {
                            jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET, (err, user) => {
                                if (err) {
                                    return res
                                        .status(401)
                                        .json({ message: "expired or invalid token" });
                                }
                                else {
                                    const userEmail = user.userEmail;
                                    const postalCode = req.body.postalcode;
                                    const token = this.bookService.createToken(userEmail, postalCode);
                                    return res
                                        .status(200)
                                        .cookie("token", token, { httpOnly: true });
                                }
                            });
                            return res.status(200).json({ message: " Availability found" });
                        }
                        else {
                            return res.status(404).json({
                                message: "We are not providing service in this area. We will notify you if any helper would start working near your area.",
                            });
                        }
                    }
                    else {
                        return res.status(301).json({ message: "No Service Provider found" });
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
        this.getUserAddresses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let U_add = [];
            if (req.headers.authorization) {
                jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET, (error, user) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "expired or invalid token" });
                    }
                    else {
                        return this.bookService
                            .getUserByEmail(user.userEmail)
                            .then((userByEmail) => {
                            if (userByEmail) {
                                return this.bookService
                                    .getUserAddress(userByEmail.UserId)
                                    .then((users) => {
                                    if (users.length > 0) {
                                        for (let x in users) {
                                            if (users[x].PostalCode === user.postalCode) {
                                                U_add.push(users[x]);
                                            }
                                        }
                                        if (U_add.length > 0) {
                                            return res.status(200).json(U_add);
                                        }
                                        else {
                                            return res
                                                .status(401)
                                                .json({ message: " No Address found" });
                                        }
                                    }
                                    else {
                                        return res
                                            .status(401)
                                            .json({ message: " No User Address found" });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({
                                        error: error,
                                    });
                                });
                            }
                            else {
                                return res.status(301).json("user not found");
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
            }
            else {
                return res.status(401).json({ message: "expired or invalid token" });
            }
        });
        this.createUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET, (error, user) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "expired or invalid token" });
                    }
                    else {
                        req.body.Email = user.userEmail;
                        req.body.PostalCode = user.postalCode;
                        return this.bookService
                            .getUserByEmail(user.userEmail)
                            .then((user) => {
                            if (user) {
                                req.body.UserId = user.UserId;
                                return this.bookService
                                    .createUserAddress(req.body)
                                    .then((address) => {
                                    return res.status(200).json({ message: "Address created successfully" });
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({
                                        error: error,
                                    });
                                });
                            }
                            else {
                                return res.status(404).json({ message: "user not found" });
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
            }
        });
        this.decodeToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, user) => {
                    if (err) {
                        return res.status(401).json({ message: "expired or invalid token" });
                    }
                    else {
                        req.body.ZipCode = user.postalCode;
                        req.body.Email = user.userEmail;
                        return this.bookService
                            .getUserByEmail(user.userEmail)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 4) {
                                next();
                            }
                            else {
                                return res.status(401).json({ message: "unauthorised user" });
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
            }
            else {
                return res.status(401).json("expired or invalid token");
            }
        });
        this.createFavoriteAndBlocked = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.bookService.createFavoriteAndBlocked(req.body)
                .then((user) => {
                return res.status(200).json(user);
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.CreateServiceRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body.Status = 1;
            req.body.ExtraHours = req.body.ExtraService.length * 0.5;
            req.body.ServiceHourlyRate = 18;
            req.body.SubTotal = this.bookService.getSubTotal(req.body.ServiceHourlyRate, req.body.ServiceHours);
            req.body.TotalCost = this.bookService.getTotalCost(req.body.ExtraService, req.body.SubTotal);
            req.body.ServiceRequestAddress.Email = req.body.Email;
            return this.bookService
                .getUserByEmail(req.body.Email)
                .then((user) => {
                if (user) {
                    if (user.UserTypeId === 4) {
                        req.body.UserId = user.UserId;
                        req.body.ModifiedBy = user.UserId;
                    }
                    else {
                        return res.status(401).json({ message: "User is unauthorized" });
                    }
                }
                else {
                    return res.status(404).json("User not found");
                }
                return this.bookService
                    .createServiceRequestWithAddress(req.body)
                    .then((request) => {
                    if (request) {
                        return this.bookService.getProviderByZipCode(request.ZipCode)
                            .then((user) => __awaiter(this, void 0, void 0, function* () {
                            if (user.length > 0) {
                                for (let x in user) {
                                    email.push(user[x].Email);
                                }
                                for (let y in email) {
                                    console.log(email[y]);
                                    const data = yield this.bookService.createTemp(email[y]);
                                    yield mg.messages().send(data, function (error, body) {
                                        if (error) {
                                            return res.json({
                                                error: error.message,
                                            });
                                        }
                                    });
                                }
                                return res
                                    .status(200)
                                    .json({ message: "service is booked now" });
                            }
                            else {
                                return res.status(404).json({ message: "user not found" });
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        });
                    }
                    else {
                        return res.status(500).json({ message: "error" });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        error: error,
                    });
                });
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.getFavoriteAndBlocked = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET, (error, user) => {
                    if (error) {
                        return res.status(401).json({ message: "expired or invalid token" });
                    }
                    else {
                        return this.bookService.getUserByEmail(user.userEmail)
                            .then((user) => {
                            if (user === null) {
                                return res.status(404).json({ message: "No user found" });
                            }
                            else {
                                return this.bookService.getFavoriteAndBlocked(user.UserId)
                                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                                    if (user === null) {
                                        return res
                                            .status(404)
                                            .json({ message: "No user found" });
                                    }
                                    else {
                                        let favoriteprovider = yield this.bookService.getTargetUser(user);
                                        if (favoriteprovider.length > 0) {
                                            return this.bookService
                                                .getUserById(favoriteprovider)
                                                .then((provider) => {
                                                return res.status(200).json(provider);
                                            })
                                                .catch((error) => {
                                                console.log(error);
                                                return res.status(500).json({
                                                    error: error,
                                                });
                                            });
                                        }
                                        else {
                                            return res.status(404).json({ message: "No favorite Service Provider found" });
                                        }
                                    }
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({
                                        error: error,
                                    });
                                });
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
            }
            else {
                return res.status(401).json({ message: "expired or invalid token" });
            }
        });
        this.bookService = bookService;
    }
}
exports.BookServiceController = BookServiceController;
