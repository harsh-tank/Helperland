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
exports.ServiceHistoryService = void 0;
const moment_1 = __importDefault(require("moment"));
class ServiceHistoryService {
    constructor(serviceHistoryRepository) {
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
    }
    ;
    getSRDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getSRDetailById(srId);
        });
    }
    ;
    getSRHistoryOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getSRHistoryOfUser(userId);
        });
    }
    ;
    FetchRatingsBySR_Id(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.FetchRatingsBySR_Id(srId);
        });
    }
    ;
    Input_Ratings(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.Input_Ratings(ratings);
        });
    }
    ;
    Confirm_valid_date(requestHistory) {
        const srHistory = [];
        const curr_date = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (let sr in requestHistory) {
            const date = requestHistory[sr].ServiceStartDate;
            const Ser_Start_Date = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (Ser_Start_Date < curr_date) {
                srHistory.push(requestHistory[sr]);
            }
        }
        return srHistory;
    }
    ;
    get_avg_Ratings(body) {
        const Avg_Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService) / 3;
        return Avg_Ratings;
    }
    Format_Time(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const sTArray = serviceRequest.ServiceStartTime.toString().split(':');
            const sT = sTArray[0] + ":" + sTArray[1];
            if (sTArray[1] === "30") {
                sTArray[1] = "0.5";
            }
            else {
                sTArray[1] = "0";
            }
            const endTimeInt = parseFloat(sTArray[0]) + parseFloat(sTArray[1]) + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
            const endTimeArray = endTimeInt.toString().split('.');
            if (endTimeArray[1] === '5') {
                endTimeArray[1] = '30';
            }
            else {
                endTimeArray[1] = '00';
            }
            const time = sT + " - " + endTimeArray[0] + ":" + endTimeArray[1];
            return time;
        });
    }
    Push_Service_Data(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let PushHistory = [];
            let status;
            for (let history in serviceRequest) {
                let user = yield this.serviceHistoryRepository.getUser_DetailById(serviceRequest[history].ServiceProviderId);
                let time = yield this.Format_Time(serviceRequest[history]);
                if (serviceRequest[history].Status === 4) {
                    status = "Cancelled";
                }
                else {
                    status = "Completed";
                }
                PushHistory.push({
                    ServiceId: serviceRequest[history].ServiceRequestId,
                    StartDate: serviceRequest[history].ServiceStartDate.toString().split('-').reverse().join('/') + " " + time,
                    ServiceProvider: (user === null || user === void 0 ? void 0 : user.FirstName) + " " + (user === null || user === void 0 ? void 0 : user.LastName),
                    Payment: serviceRequest[history].TotalCost,
                    Status: status
                });
            }
            return PushHistory;
        });
    }
}
exports.ServiceHistoryService = ServiceHistoryService;
