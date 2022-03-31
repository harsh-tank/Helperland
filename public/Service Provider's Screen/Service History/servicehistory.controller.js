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
            console.log('Inside SR Route');
            const Id = +req.params.id;
            console.log("Hello");
            console.log(Id);
            if (req.body.userTypeId === 3) {
                return this.serviceHistoryService.getSRDetailById(Id)
                    .then((ser_Req) => {
                    console.log(ser_Req);
                    if ((ser_Req === null || ser_Req === void 0 ? void 0 : ser_Req.ServiceProviderId) === req.body.userId) {
                        return res.status(200).json(ser_Req);
                    }
                    else {
                        return res.status(404).json({
                            message: "SR Details Not Found",
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
        this.getAllCompletedSR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryService.getSRHistoryOfProvider(+req.body.userId)
                .then((requestHistory) => __awaiter(this, void 0, void 0, function* () {
                if (requestHistory) {
                    if (requestHistory.length > 0) {
                        const past_Data = this.serviceHistoryService.ValidateDateWithCurrent(requestHistory);
                        if (requestHistory.length > 0) {
                            const his_Data = yield this.serviceHistoryService.PrintSRHistory(past_Data);
                            if (his_Data.length > 0) {
                                return res.status(200).json(his_Data);
                            }
                            else {
                                return res.status(404).json({ message: 'No Past SR History Available' });
                            }
                        }
                        else {
                            return res.status(404).json({ message: 'No Past SR History Available' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Service request history not found' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Service request not found' });
                }
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.PrintRatingsofSP = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3 && req.body.userId) {
                return this.serviceHistoryService.getRatingsOfProvider(req.body.userId)
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result) {
                        const Print_data = yield this.serviceHistoryService.PrintRatingsofSP(result);
                        if (Print_data.length > 0) {
                            return res.status(200).json(Print_data);
                        }
                        else {
                            return res.status(404).json({ message: "data not found" });
                        }
                    }
                    else {
                        return res.status(404).json({ message: "ratings not found" });
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
        this.Transfer_In_ExcelSheet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let Push_History = [];
            return this.serviceHistoryService.getSRHistoryOfProvider(+req.body.userId)
                .then((req_His) => __awaiter(this, void 0, void 0, function* () {
                if (req_His) {
                    if (req_His.length > 0) {
                        const pastDateHistory = this.serviceHistoryService.ValidateDateWithCurrent(req_His);
                        if (req_His.length > 0) {
                            Push_History = yield this.serviceHistoryService.Push_Service_Data(pastDateHistory);
                            let wb = new exceljs_1.default.Workbook();
                            let ws = wb.addWorksheet("Service_History");
                            ws.columns = [{ header: "ServiceId", key: "ServiceId", width: 25 }, { header: "StartDate", key: "StartDate", width: 25 }, { header: "Customer", key: "Customer", width: 25 },
                                { header: "Payment", key: "Payment", width: 10 },];
                            ws.addRows(Push_History);
                            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                            res.setHeader("Content-Disposition", "attachment; filename=" + "Service_History.xlsx");
                            const data = yield wb.xlsx.writeFile(`../Service_History.xlsx`)
                                .then(() => {
                                res.send({
                                    status: "success",
                                    message: "file successfully downloaded"
                                });
                            });
                        }
                        else {
                            return res.status(404).json({ message: 'Data Not Available' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Data Not Available' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Data Not Available' });
                }
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.serviceHistoryService = serviceHistoryService;
    }
}
exports.ServiceHistoryController = ServiceHistoryController;
