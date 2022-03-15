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
exports.SubscribeUserController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class SubscribeUserController {
    constructor(subscribeUserService) {
        this.subscribeUserService = subscribeUserService;
        this.createSubscribeUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Email = req.body.Email;
            req.body.IsConfirmedSubscriber = true;
            if (Email) {
                return this.subscribeUserService.getSubscribeUserByEmail(Email)
                    .then(user => {
                    if (!user) {
                        return this.subscribeUserService.createSubscribeUser(req.body)
                            .then(user => {
                            const data = this.subscribeUserService.createData(user.Email);
                            mg.messages().send(data, function (error, body) {
                                if (error) {
                                    return res.json({
                                        error: error.message,
                                    });
                                }
                            });
                            return res.status(200).json({
                                message: "Subscription Email has been sent to you Email ID",
                            });
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({
                                error: error
                            });
                        });
                    }
                    else {
                        return res.status(400).json({ mesage: 'You are already a subscribed User' });
                    }
                })
                    .catch((error) => {
                    return res.status(500).json({
                        error: error
                    });
                });
            }
            else {
                return res.status(401).json({ mesage: 'something went wrong' });
            }
        });
        this.sendEmailToAllSubscribers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserService
                .getSubscribeUser()
                .then((SubscribeUser) => __awaiter(this, void 0, void 0, function* () {
                if (SubscribeUser.length <= 0) {
                    return res.status(200).json({ message: 'users not found' });
                }
                else {
                    const user = Object.assign({}, Object.assign({}, SubscribeUser));
                    const email = [];
                    for (const subscribeUser in user) {
                        if (user[subscribeUser].IsConfirmedSubscriber === true) {
                            email.push((user[subscribeUser].Email));
                        }
                    }
                    ;
                    console.log(email);
                    for (let e in email) {
                        const data = this.subscribeUserService.createDataForAll(email[e]);
                        yield mg.messages().send(data, function (error, body) {
                            if (error) {
                                return res.json({
                                    error: error.message,
                                });
                            }
                        });
                    }
                    return res.status(200).json({ message: 'Email sent successfully' });
                }
            }))
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getSubscribeUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserService
                .getSubscribeUserById(+req.params.id)
                .then(subscribeUser => {
                if (subscribeUser) {
                    return res.status(200).json(subscribeUser);
                }
                else {
                    return res.status(404).json({ error: 'NotFound' });
                }
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getSubscribeUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserService
                .getSubscribeUser()
                .then((SubscribeUser) => {
                return res.status(200).json({ SubscribeUser });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.subscribeUserService = subscribeUserService;
    }
}
exports.SubscribeUserController = SubscribeUserController;
