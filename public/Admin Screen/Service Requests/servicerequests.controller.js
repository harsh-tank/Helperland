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
exports.ServiceRequestsController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class ServiceRequestsController {
    constructor(serviceRequestsService) {
        this.serviceRequestsService = serviceRequestsService;
        this.reschedule_SR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const confirm = yield this.serviceRequestsService.Same_Reschedule_check(req.body);
            if (confirm === false) {
                const Valid = this.serviceRequestsService.ValidatedDate(req.body.ServiceStartDate);
                if (Valid) {
                    return this.serviceRequestsService.reschedule_SR(req.body, req.body.userId)
                        .then((re_sr) => __awaiter(this, void 0, void 0, function* () {
                        if (re_sr[0] === 1) {
                            const mail = yield this.serviceRequestsService.User_SP_mail(req.body.serviceRequest);
                            if (req.body.updatedAddress) {
                                for (let x in mail) {
                                    const data = this.serviceRequestsService.SendEmail_For_SR_upd(mail[x], req.body);
                                    mg.messages().send(data, (error, body) => {
                                        if (error) {
                                            return res.json({ error: error.message });
                                        }
                                    });
                                }
                            }
                            else {
                                for (let x in mail) {
                                    const data = this.serviceRequestsService.SendEmail_for_Reschedule_SR(mail[x], req.body);
                                    mg.messages().send(data, (error, body) => {
                                        if (error) {
                                            return res.json({ error: error.message });
                                        }
                                    });
                                }
                            }
                            return res.status(200).json({ message: 'SR updated successfully.' });
                        }
                        else {
                            return res.status(422).json({ message: "error while rescheduling sr" });
                        }
                    }))
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res.status(400).json({ message: "Enter Valid Date to reschedule SR" });
                }
            }
            else {
                if (req.body.updatedAddress) {
                    const mail = yield this.serviceRequestsService.User_SP_mail(req.body.serviceRequest);
                    for (let x in mail) {
                        const data = this.serviceRequestsService.SendEmail_for_Add_Upd(mail[x], req.body);
                        mg.messages().send(data, (error, body) => {
                            if (error) {
                                return res.json({ error: error.message });
                            }
                        });
                    }
                    return res.status(200).json({ message: 'sr address updated successfully.' });
                }
                else {
                    return res.status(201).json({ message: 'sr is unchanged.' });
                }
            }
        });
        this.cancelSR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 2) {
                if (req.params.requestId) {
                    return this.serviceRequestsService.getSRById(req.params.requestId)
                        .then((ser_Req) => __awaiter(this, void 0, void 0, function* () {
                        if (ser_Req) {
                            if (ser_Req.Status === 3) {
                                return res.status(401).json({ message: "SR is completed so it cannot be cancelled",
                                });
                            }
                            else if (ser_Req.Status === 4) {
                                return res.status(401).json({ message: "service request is already cancelled." });
                            }
                            else if (ser_Req.Status === 5) {
                                return res.status(401).json({ message: "service request already refunded." });
                            }
                            else {
                                return this.serviceRequestsService.upd_SR(req.params.requestId, req.body.userId)
                                    .then((upd_ser_req) => __awaiter(this, void 0, void 0, function* () {
                                    if (upd_ser_req[0] === 1) {
                                        const mail = yield this.serviceRequestsService.User_SP_mail(ser_Req);
                                        for (let x in mail) {
                                            const data = this.serviceRequestsService.SendEmail(mail[x], ser_Req.ServiceRequestId);
                                            mg.messages().send(data, (error, body) => {
                                                if (error) {
                                                    return res.json({ error: error.message });
                                                }
                                            });
                                        }
                                        return res.status(200).json({ message: "SR is cancelled successfully.", });
                                    }
                                    else {
                                        return res.status(422).json({ message: "error while cancelling" });
                                    }
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                        }
                        else {
                            return res
                                .status(200)
                                .json({ message: "No SR Found" });
                        }
                    }))
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res.status(422).json({ message: "Enter SR ID " });
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.Modify_SR = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 2) {
                if (req.body.ServiceRequestId) {
                    return this.serviceRequestsService.getSRById(req.body.ServiceRequestId)
                        .then((ser_Req) => __awaiter(this, void 0, void 0, function* () {
                        if (ser_Req) {
                            req.body.serviceRequest = ser_Req;
                            if (ser_Req.Status === 1 || ser_Req.Status === 2) {
                                return this.serviceRequestsService.upd_SR_Add(req.body)
                                    .then((upd_Req) => __awaiter(this, void 0, void 0, function* () {
                                    if (upd_Req) {
                                        if (upd_Req[0] === 1) {
                                            req.body.updatedAddress = true;
                                            next();
                                        }
                                        else {
                                            return res.status(422).json({ message: "error while updating" });
                                        }
                                    }
                                    else {
                                        req.body.updatedAddress = false;
                                        next();
                                    }
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(401).json({ message: "SR is already completed or cancelled ,Therefore it can not be edited or rescheduled.",
                                });
                            }
                        }
                        else {
                            return res.status(200).json({ message: "No SR Found" });
                        }
                    }))
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res.status(422).json({ message: "Enter SR ID" });
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.getAllSR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 2 && req.body.userId) {
                return this.serviceRequestsService.getAllSR()
                    .then((ser_Req) => {
                    if (ser_Req && ser_Req.length > 0) {
                        return res.status(200).json(ser_Req);
                    }
                    else {
                        return res.status(404).json({ message: "No SR Found" });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorised user" });
            }
        });
        this.filter_feature_SR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filters = req.body;
            if (req.body.userTypeId === 2) {
                return this.serviceRequestsService.getAllSR()
                    .then((ser_Req) => __awaiter(this, void 0, void 0, function* () {
                    if (ser_Req && ser_Req.length > 0) {
                        const f_List = yield this.serviceRequestsService.filter_feature_SR(ser_Req, filters);
                        return res.status(200).json(f_List);
                    }
                    else {
                        return res.status(404).json({ message: "No SR found" });
                    }
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.serviceRequestsService = serviceRequestsService;
    }
}
exports.ServiceRequestsController = ServiceRequestsController;
