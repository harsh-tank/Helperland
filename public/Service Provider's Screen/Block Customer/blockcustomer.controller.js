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
exports.BlockCustomerController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class BlockCustomerController {
    constructor(blockCustomerService) {
        this.blockCustomerService = blockCustomerService;
        this.Cust_BlockList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3 && req.body.userId) {
                req.body.TargetUserId = req.params.userId;
                if (req.body.IsBlocked) {
                    const inCustList = yield this.blockCustomerService.IsCustProviderRelated(req.body.userId, req.params.userId);
                    if (inCustList) {
                        return this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                            .then(block_Cust => {
                            if (block_Cust && block_Cust.IsBlocked) {
                                return res.status(201).json({ message: 'Customer is already Blocked' });
                            }
                            else if (block_Cust && block_Cust.IsBlocked === false) {
                                return this.blockCustomerService.updateBlockedCustofSP(req.body.userId, req.params.userId)
                                    .then(up_Cust => {
                                    if (up_Cust[0] === 1) {
                                        return res.status(200).json({ message: 'Customer is Blocked Now' });
                                    }
                                    else {
                                        return res.status(422).json({ message: 'error While blocking' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                req.body.UserId = req.body.userId;
                                req.body.IsFavorite = false;
                                return this.blockCustomerService.createBlockUnblockCust(req.body)
                                    .then(result => {
                                    if (result) {
                                        return res.status(200).json(result);
                                    }
                                    else {
                                        return res.status(404).json({ message: 'error while creating data' });
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
                        return res.status(400).json({ message: 'Provider and Customers Havenot Worked Together' });
                    }
                }
                else {
                    next();
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.getCompletedSRofProvider = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3 && req.body.userId) {
                const cust = yield this.blockCustomerService.getCompletedSRofProvider(req.body.userId);
                if (cust) {
                    if (cust.length > 0) {
                        return res.status(200).json(cust);
                    }
                    else {
                        return res.status(401).json({ message: "No customer found" });
                    }
                }
                else {
                    return res.status(404).json({ message: "No customer found" });
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.Cust_UnBlockList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.IsBlocked === false) {
                return this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                    .then(result => {
                    if (result && result.IsBlocked) {
                        return this.blockCustomerService.updateUnBlockedCustofProvider(req.body.userId, req.params.userId)
                            .then(up_Cust => {
                            if (up_Cust[0] === 1) {
                                return res.status(200).json({ message: 'customer is unblocked successfully' });
                            }
                            else {
                                return res.status(422).json({ message: 'error while unblocking' });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else if (result && result.IsBlocked === false) {
                        return res.status(201).json({ message: 'customer is already unblocked' });
                    }
                    else {
                        return res.status(404).json({ message: 'No Customer Available to Unblock' });
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
        this.blockCustomerService = blockCustomerService;
    }
}
exports.BlockCustomerController = BlockCustomerController;
