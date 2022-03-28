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
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getUserDetailById(userId);
        });
    }
    getSRDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getSRDetailById(srId);
        });
    }
    getSRHistoryOfProvider(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getSRHistoryOfProvider(userId);
        });
    }
    getRatingsOfProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getRatingsOfProvider(+ProviderId);
        });
    }
    Push_Service_Data(ser_Req) {
        return __awaiter(this, void 0, void 0, function* () {
            let push_History = [];
            for (let history in ser_Req) {
                let user = yield this.serviceHistoryRepository.getUserDetailById(ser_Req[history].UserId);
                push_History.push({ ServiceId: ser_Req[history].ServiceRequestId,
                    StartDate: ser_Req[history].ServiceStartDate,
                    Customer: (user === null || user === void 0 ? void 0 : user.FirstName) + " " + (user === null || user === void 0 ? void 0 : user.LastName),
                    Payment: ser_Req[history].TotalCost, });
            }
            return push_History;
        });
    }
    PrintSRHistory(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let Push_Data = [];
            for (let x in serviceRequest) {
                let user = yield this.serviceHistoryRepository.getUserDetailById(serviceRequest[x].UserId);
                let address = yield this.serviceHistoryRepository.getServiceAddress(serviceRequest[x].ServiceRequestId);
                const st_TimeArray = serviceRequest[x].ServiceStartTime.toString().split(":");
                const endTimeInt = (parseFloat(st_TimeArray[0]) + parseFloat(st_TimeArray[1]) / 60 + serviceRequest[x].ServiceHours +
                    serviceRequest[x].ExtraHours).toString().split(".");
                if (endTimeInt[1]) {
                    endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                }
                else {
                    endTimeInt[1] = "00";
                }
                if (user) {
                    if (address) {
                        Push_Data.push({
                            ServiceId: serviceRequest[x].ServiceRequestId,
                            StartDate: serviceRequest[x].ServiceStartDate.toString().split("-").reverse()
                                .join("-"),
                            Customer: user.FirstName + " " + user.LastName,
                            Address: {
                                Street: address.AddressLine1,
                                HouseNumber: address.AddressLine2,
                                City: address.City,
                                PostalCode: address.PostalCode,
                            },
                            Time: st_TimeArray[0] + ":" + st_TimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1]
                        });
                    }
                }
            }
            return Push_Data;
        });
    }
    ValidateDateWithCurrent(requestHistory) {
        const srHistory = [];
        const Today_date = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (let sr in requestHistory) {
            const date = requestHistory[sr].ServiceStartDate;
            const SRDate = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (SRDate <= Today_date) {
                srHistory.push(requestHistory[sr]);
            }
        }
        return srHistory;
    }
    PrintRatingsofSP(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            let push_Data = [];
            for (let rate in ratings) {
                let serviceRequest = yield this.serviceHistoryRepository.getSRDetailById(ratings[rate].ServiceRequestId);
                const st_TimeArray = serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceStartTime.toString().split(":");
                const end_Time = (parseFloat(st_TimeArray[0]) + parseFloat(st_TimeArray[1]) / 60 +
                    (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceHours) + (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ExtraHours)).toString().split(".");
                if (end_Time[1]) {
                    end_Time[1] = (parseInt(end_Time[1]) * 6).toString();
                }
                else {
                    end_Time[1] = "00";
                }
                let user = yield this.serviceHistoryRepository
                    .getUserDetailById(ratings[rate].RatingFrom)
                    .then((user) => {
                    if (serviceRequest) {
                        if (user) {
                            push_Data.push({
                                ServiceId: ratings[rate].ServiceRequestId,
                                StartDate: serviceRequest.ServiceStartDate.toString().split("-").reverse().join("-"),
                                Customer: user.FirstName + " " + user.LastName,
                                CustomerComment: ratings[rate].Comments,
                                Ratings: ratings[rate].Ratings,
                                Time: st_TimeArray[0] + ":" + st_TimeArray[1] + "-" + end_Time[0] + ":" + end_Time[1]
                            });
                        }
                    }
                });
            }
            return push_Data;
        });
    }
}
exports.ServiceHistoryService = ServiceHistoryService;
