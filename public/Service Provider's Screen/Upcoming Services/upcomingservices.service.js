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
exports.UpcomingService = void 0;
const moment_1 = __importDefault(require("moment"));
class UpcomingService {
    constructor(upcomingServicesRepository) {
        this.upcomingServicesRepository = upcomingServicesRepository;
        this.upcomingServicesRepository = upcomingServicesRepository;
    }
    getAllUpcomingSR(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getAllUpcomingSR(+ProviderId)
                .then(ser_Req => {
                const sRequest = [];
                const currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                if (ser_Req) {
                    for (let sr in ser_Req) {
                        let serviceRequestDate = new Date(ser_Req[sr].ServiceStartDate);
                        if (currentDate > serviceRequestDate) {
                            continue;
                        }
                        sRequest.push(ser_Req[sr]);
                    }
                }
                return sRequest;
            });
        });
    }
    cancelSR(serviceId, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.cancelSR(+serviceId, +ProviderId);
        });
    }
    completeSR(serviceId, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.completeSR(+serviceId, +ProviderId);
        });
    }
    getServiceDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceDetailById(srId);
        });
    }
    getServiceRequestById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceRequestById(parseInt(requestId));
        });
    }
    isValidRequestTime(serviceRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cur_Date = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
            const sRequestDate = new Date((_a = serviceRequest) === null || _a === void 0 ? void 0 : _a.ServiceStartDate);
            var time = serviceRequest.ServiceStartTime.toString().split(":");
            const requestTime = parseFloat(time[0]) + parseFloat(time[1]) / 60;
            const requestTotalTime = requestTime + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
            const cur_TotalTime = new Date().getHours() + new Date().getMinutes() / 60;
            if (sRequestDate < cur_Date) {
                return serviceRequest;
            }
            else if (sRequestDate > cur_Date) {
                return null;
            }
            else {
                if (requestTotalTime < cur_TotalTime) {
                    return serviceRequest;
                }
                else {
                    return null;
                }
            }
        });
    }
    getServiceRequestForCR(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceRequestById(parseInt(requestId));
        });
    }
}
exports.UpcomingService = UpcomingService;
