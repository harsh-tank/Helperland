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
exports.ServiceRequestController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class ServiceRequestController {
    constructor(serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
        this.getServiceRequestById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3) {
                return this.serviceRequestService.getServiceRequestById(req.params.requestId)
                    .then((ser_Req_info) => {
                    if (ser_Req_info) {
                        return res.status(200).json(ser_Req_info);
                    }
                    else {
                        return res
                            .status(404)
                            .json({ message: "request detail not available" });
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
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.IsSRAcceptable = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.params.requestId) {
                return this.serviceRequestService.getServiceRequestById(req.params.requestId)
                    .then((ser_Req) => {
                    if (ser_Req) {
                        req.body.ZipCode = ser_Req.ZipCode;
                        return this.serviceRequestService.getAllServiceRequestsOfProvider(req.body.userId)
                            .then((serviceRequests) => __awaiter(this, void 0, void 0, function* () {
                            req.body.totalHour = ser_Req.ExtraHours + ser_Req.ServiceHours;
                            if (serviceRequests) {
                                const { srId, confirm } = yield this.serviceRequestService.SPTimeConflict(ser_Req.ServiceStartDate, serviceRequests, req.body.totalHour, ser_Req.ServiceStartTime);
                                if (confirm) {
                                    return res.status(422).json({
                                        message: "Another service request " + srId + " has already been assigned which has time overlap with this service request. You can’t pick this one!",
                                    });
                                }
                                else {
                                    next();
                                }
                            }
                            else {
                                next();
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(422).json({
                            message: "This service request is no more available. It has been assigned to another provider",
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Invalid Input" });
            }
        });
        this.acceptNewSR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestService.acceptNewSR(req.params.requestId, req.body.userId)
                .then((up_Ser_Req) => {
                if (up_Ser_Req[0] === 1) {
                    return this.serviceRequestService.getServiceProvidersByZipCode(req.body.ZipCode)
                        .then((Provider) => {
                        if (Provider) {
                            for (let hp in Provider) {
                                if (Provider[hp].Email === req.body.email) {
                                    continue;
                                }
                                const data = this.serviceRequestService.createEmail(Provider[hp].Email, req.params.requestId);
                                mg.messages().send(data, (error, body) => {
                                    if (error) {
                                        return res.json({ error: error.message });
                                    }
                                });
                            }
                        }
                        return res
                            .status(200)
                            .json({ message: "service request is accepted now" });
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res
                        .status(404)
                        .json({ message: "error While accepting request" });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.getAllNewSR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3) {
                if (req.body.userId) {
                    return this.serviceRequestService.getServiceProviderDetailById(req.body.userId)
                        .then((Provider) => {
                        if (Provider) {
                            if (Provider.ZipCode === null) {
                                return res.status(404).json({
                                    message: "Plz enter your Zipcode",
                                });
                            }
                            else {
                                return this.serviceRequestService
                                    .getAllUnAcceptedServiceRequestByZipcode(Provider.ZipCode, req.body.userId)
                                    .then((ser_Req) => __awaiter(this, void 0, void 0, function* () {
                                    if (ser_Req && ser_Req.length > 0) {
                                        const sRequests = yield this.serviceRequestService.IsSPComfortableWithPets(req.body.PetsAtHome, ser_Req);
                                        if (sRequests && sRequests.length > 0) {
                                            const requestDetail = yield this.serviceRequestService.PrintSRDetail(sRequests);
                                            return res.status(200).json(requestDetail);
                                        }
                                        else {
                                            return res
                                                .status(404)
                                                .json({ message: "No Service Request Found" });
                                        }
                                    }
                                    else {
                                        return res
                                            .status(404)
                                            .json({ message: "No Service Request Found" });
                                    }
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                        }
                        else {
                            return res.status(404).json({ message: "No Service Provider Found" });
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res
                        .status(422)
                        .json({ message: "Service Provider Id is Not Found" });
                }
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.serviceRequestService = serviceRequestService;
    }
}
exports.ServiceRequestController = ServiceRequestController;
