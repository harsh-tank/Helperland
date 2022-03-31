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
            const token = req.headers.authorization || req.header('x-auth');
            if (!req.body.postalcode) {
                return res.status(400).json({ message: "Plz enter Zipcode" });
            }
            else {
                //console.log("Inside else");
                return this.bookService
                    .getAllProvider()
                    .then((provider) => {
                    //console.log("provider present"); 
                    let isAvailable;
                    if (provider) {
                        for (let p in provider) {
                            console.log(provider[p].FirstName);
                            if (provider[p].ZipCode === req.body.postalcode) {
                                isAvailable = true;
                            }
                        }
                        if (isAvailable) {
                            jsonwebtoken_1.default.verify(req.header('x-auth'), process.env.SECRET, (err, user) => {
                                if (err) {
                                    return res.status(401).json({ message: "expired or invalid token" });
                                }
                                else {
                                    const userEmail = user.userEmail;
                                    const postalCode = req.body.postalcode;
                                    const token = this.bookService.createToken(userEmail, postalCode);
                                    return res.status(200).cookie("token", token, { httpOnly: true });
                                }
                            });
                            return res.status(200).json({ message: " Availability found" });
                        }
                        else {
                            return res.status(404).json({ message: "We are not providing service in this area. We will notify you if any helper would start working near your area.", });
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
        this.createUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (req.header('x-auth')) {
                jsonwebtoken_1.default.verify(req.header('x-auth'), process.env.SECRET, (error, user) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "expired or invalid token" });
                    }
                    else {
                        req.body.Email = user.userEmail;
                        req.body.PostalCode = user.ZipCode;
                        return this.bookService
                            .getUserByEmail(user.userEmail)
                            .then((user) => {
                            if (user) {
                                req.body.UserId = user.UserId;
                                return this.bookService
                                    .createUserAddress(req.body)
                                    .then((add) => {
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
        this.getUserAddresses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let U_add = [];
            const token = req.headers.authorization || req.header('auth');
            if (req.header('x-auth')) {
                jsonwebtoken_1.default.verify(req.header('x-auth'), process.env.SECRET, (error, user) => {
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
                                            if (users[x].PostalCode === user.ZipCode) {
                                                U_add.push(users[x]);
                                            }
                                        }
                                        if (U_add.length > 0) {
                                            return res.status(200).json(U_add);
                                        }
                                        else {
                                            return res.status(401).json({ message: " No Address found" });
                                        }
                                    }
                                    else {
                                        return res.status(401).json({ message: " No User Address found" });
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
        this.decodeToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.header('x-auth');
            const isValidDate = yield this.bookService.ValidateWithToday_Date(req.body.ServiceStartDate);
            if (isValidDate) {
                req.body.ServiceStartDate = new Date(req.body.ServiceStartDate.toString().split('-').reverse().join('-'));
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, user) => {
                        if (err) {
                            return res.status(401).json({ message: "expired or invalid token" });
                        }
                        else {
                            req.body.ZipCode = user.ZipCode;
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
            }
            else {
                return res.status(401).json({ message: 'enter valid date to book service' });
            }
        });
        this.createFavoriteAndBlocked = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.bookService.createFavoriteAndBlocked(req.body)
                .then((result) => {
                return res.status(200).json(result);
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.CreateServiceRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            req.body.ExtraHours = req.body.ExtraService.length * 0.5;
            req.body.ServiceHourlyRate = 18;
            req.body.SubTotal = this.bookService.getSubTotal(req.body.ServiceHourlyRate, req.body.ServiceHours);
            req.body.TotalCost = this.bookService.getTotalCost(req.body.ExtraService, req.body.SubTotal);
            req.body.ServiceRequestAddress.Email = req.body.Email;
            if (req.body.ServiceProviderId) {
                req.body.Status = 2;
            }
            else {
                req.body.Status = 1;
            }
            if (req.body.ServiceHours < 3) {
                return res.json({ message: "Service Hours Should be atleast 3 or More !" });
            }
            return this.bookService.getUserByEmail(req.body.Email)
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
                //console.log(req.body);
                return this.bookService
                    .createServiceRequestWithAddress(req.body)
                    .then((result) => {
                    if (result) {
                        if (result.ServiceProviderId) {
                            return this.bookService.getProviderById(result.ServiceProviderId)
                                .then(helper => {
                                if (helper) {
                                    const data = this.bookService.DirectAssign(helper.Email, result.ServiceRequestId);
                                    mg.messages().send(data, (error, user) => {
                                        if (error) {
                                            return res.json({
                                                error: error.message,
                                            });
                                        }
                                    });
                                }
                                else {
                                    return res.status(404).json({ message: "Service Provider Not Found" });
                                }
                                return res.status(200).json({ message: "service booked successfully" });
                            })
                                .catch((error) => {
                                console.log(error);
                                return res.status(500).json({
                                    error: error,
                                });
                            });
                        }
                        else {
                            console.log("hello inside else");
                            //console.log(result.ZipCode)
                            return this.bookService.getProviderByZipCode(result.ZipCode)
                                .then((helper) => __awaiter(this, void 0, void 0, function* () {
                                //console.log(helper);
                                if (helper.length > 0) {
                                    const hp = yield this.bookService.getBlockedCustomerofProvider(+req.body.userId, helper);
                                    //console.log("hp is");
                                    //console.log(hp);
                                    return this.bookService.getAllBlockedProviderofUser(+req.body.userId, hp)
                                        .then((blockedHelper) => __awaiter(this, void 0, void 0, function* () {
                                        if (blockedHelper) {
                                            //console.log("Blocked Provider is");
                                            //console.log(blockedHelper);
                                            const users = yield this.bookService.Fetchout_Blocked_Provider(hp, blockedHelper);
                                            //console.log("imp user is ");
                                            //console.log(users);
                                            email = this.bookService.SendEmailBasedOnHasPets(users, req.body);
                                            //console.log("email is");
                                            //console.log(email);
                                            for (let e in email) {
                                                console.log(email[e]);
                                                const data = yield this.bookService.createTemp(email[e]);
                                                yield mg.messages().send(data, function (error, body) {
                                                    if (error) {
                                                        return res.json({
                                                            error: error.message,
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                        return res.status(200).json({ message: "service booked successfully" });
                                    }))
                                        .catch((error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json({ message: "user not found" });
                                }
                            }))
                                .catch((error) => {
                                console.log(error);
                                return res.status(500).json({ error: error, });
                            });
                        }
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
            const token = req.headers.authorization || req.header('x- auth');
            jsonwebtoken_1.default.verify(token, process.env.SECRET, (error, userToken) => {
                if (error) {
                    return res.status(401).json({ message: "invalid or expired token" });
                }
                else {
                    if (req.body.userTypeId === 4 && req.body.userId) {
                        return this.bookService.getFavoriteAndBlocked(req.body.userId)
                            .then((result) => __awaiter(this, void 0, void 0, function* () {
                            if (result === null) {
                                return res.status(404).json({ message: "No Service Provider in Favourite List" });
                            }
                            else {
                                let fav_Provider = yield this.bookService.getRequiredUser(result, userToken.postalCode);
                                if (fav_Provider.length > 0) {
                                    return res.status(200).send(fav_Provider);
                                }
                                else {
                                    return res
                                        .status(404)
                                        .json({ message: "favorite helper not found" });
                                }
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(401).json({ message: 'unauthorised user' });
                    }
                }
            });
        });
        this.bookService = bookService;
    }
}
exports.BookServiceController = BookServiceController;
