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
exports.ServiceHistoryController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const exceljs_1 = __importDefault(require("exceljs"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class ServiceHistoryController {
    constructor(serviceHistoryService) {
        this.serviceHistoryService = serviceHistoryService;
        this.getSRDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Id = +req.params.id;
            if (req.body.userTypeId === 4) {
                return this.serviceHistoryService.getSRDetailById(Id)
                    .then((ser_Req_Detail) => {
                    if ((ser_Req_Detail === null || ser_Req_Detail === void 0 ? void 0 : ser_Req_Detail.UserId) === req.body.userId) {
                        return res.status(200).json(ser_Req_Detail);
                    }
                    else {
                        return res.status(404).json({
                            message: "No service request detail found for this ID",
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
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.getSRHistoryOfUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryService.getSRHistoryOfUser(+req.body.userId)
                .then(requestHistory => {
                if (requestHistory) {
                    if (requestHistory.length > 0) {
                        const Ser_History = this.serviceHistoryService.Confirm_valid_date(requestHistory);
                        if (requestHistory.length > 0) {
                            return res.status(200).json(Ser_History);
                        }
                        else {
                            return res.status(404).json({ message: 'No Service request history found' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'No Service request history found' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'No Service request history found' });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.Transfer_In_ExcelSheet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let PushHistory = [];
            return this.serviceHistoryService.getSRHistoryOfUser(+req.body.userId)
                .then((req_History) => __awaiter(this, void 0, void 0, function* () {
                if (req_History) {
                    if (req_History.length > 0) {
                        const pastDateHistory = this.serviceHistoryService.Confirm_valid_date(req_History);
                        if (req_History.length > 0) {
                            PushHistory = yield this.serviceHistoryService.Push_Service_Data(pastDateHistory);
                            let work_book = new exceljs_1.default.Workbook();
                            let work_sheet = work_book.addWorksheet("Service_History");
                            work_sheet.columns = [
                                { header: "ServiceId", key: "ServiceId", width: 10 },
                                { header: "StartDate", key: "StartDate", width: 25 },
                                { header: "ServiceProvider", key: "ServiceProvider", width: 25 },
                                { header: "Payment", key: "Payment", width: 10 },
                                { header: "Status", key: "Status", width: 15 }
                            ];
                            work_sheet.addRows(PushHistory);
                            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                            res.setHeader("Content-Disposition", "attachment; filename=" + "Service_History.xlsx");
                            const data = yield work_book.xlsx.writeFile(`../Service_History.xlsx`)
                                .then(() => {
                                res.send({
                                    status: "success",
                                    message: "file successfully downloaded"
                                });
                            });
                        }
                        else {
                            return res.status(404).json({ message: 'No Data Available' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'No Data Available' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'No Data Available' });
                }
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.rating_of_SP = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const serviceId = +req.params.serviceId;
            req.body.RatingDate = new Date();
            return this.serviceHistoryService.FetchRatingsBySR_Id(serviceId)
                .then(rate => {
                if (rate) {
                    return res.status(201).json({ message: 'Ratings is already given' });
                }
                else {
                    if (serviceId) {
                        return this.serviceHistoryService.getSRDetailById(serviceId)
                            .then(ser_Req => {
                            if (ser_Req) {
                                req.body.ServiceRequestId = ser_Req.ServiceRequestId;
                                if (req.body.userTypeId === 4 && req.body.userId === ser_Req.UserId) {
                                    req.body.RatingFrom = ser_Req.UserId;
                                    if (ser_Req.Status === 3 && ser_Req.ServiceProviderId) {
                                        req.body.RatingTo = ser_Req.ServiceProviderId;
                                        req.body.Ratings = this.serviceHistoryService.get_avg_Ratings(req.body);
                                        return this.serviceHistoryService.Input_Ratings(req.body)
                                            .then(rate => {
                                            return res.status(200).json(rate);
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({
                                                error: error,
                                            });
                                        });
                                    }
                                    else {
                                        return res.status(400).json({ message: 'service request not completed or service provider not found' });
                                    }
                                }
                                else {
                                    return res.status(401).json({ message: 'unauthorised user' });
                                }
                            }
                            else {
                                return res.status(404).json({ message: 'No service request' });
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
                        return res.status(404).json({ message: 'No service request id found' });
                    }
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.serviceHistoryService = serviceHistoryService;
    }
}
exports.ServiceHistoryController = ServiceHistoryController;
