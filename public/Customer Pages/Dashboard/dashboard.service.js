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
exports.DashboardService = void 0;
const moment_1 = __importDefault(require("moment"));
class DashboardService {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardRepository = dashboardRepository;
    }
    ;
    getSRDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getSRDetailById(srId);
        });
    }
    ;
    getAllSROfProvider(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getAllSROfProvider(providerId);
        });
    }
    ;
    rescheduleSR(date, time, srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.rescheduleSR(date, time, srId);
        });
    }
    ;
    getProviderById(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getProviderById(providerId);
        });
    }
    ;
    getAllSRByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getAllSRByUserId(userId);
        });
    }
    ;
    updateSR(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.updateSR(srId);
        });
    }
    ;
    TimeConflictOfProvider(date, serviceRequest, totalHour, time) {
        let Ser_Req_Date;
        let startTime;
        let endTime;
        const User_Time = time.split(":");
        if (User_Time[1] === '30') {
            User_Time[1] = '0.5';
        }
        const enteredTime = parseFloat(User_Time[0]) + parseFloat(User_Time[1]);
        const enteredDate = new Date(date.split("-").reverse().join("-"));
        let conflict;
        for (let count in serviceRequest) {
            if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) {
                conflict = false;
            }
            else if (new Date(serviceRequest[count].ServiceStartDate) < enteredDate) {
                conflict = false;
            }
            else {
                const sTime = serviceRequest[count].ServiceStartTime.toString().split(":");
                if (sTime[1] === '30') {
                    sTime[1] = '0.5';
                }
                const bookedStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
                const bookedTotalHour = serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
                console.log(enteredTime);
                console.log(totalHour);
                console.log(bookedStartTime);
                console.log(bookedTotalHour);
                if (enteredTime + totalHour < bookedStartTime || bookedStartTime + bookedTotalHour < enteredTime) {
                    conflict = false;
                }
                else {
                    Ser_Req_Date = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");
                    const srTime = bookedStartTime.toString().split('.');
                    if (srTime[1] === '5') {
                        srTime[1] = '30';
                    }
                    else {
                        srTime[1] = '00';
                    }
                    startTime = srTime.join(':');
                    const eTime = (bookedStartTime + bookedTotalHour).toString().split('.');
                    if (parseInt(eTime[1]) === 5) {
                        eTime[1] = '30';
                    }
                    else {
                        eTime[1] = '00';
                    }
                    endTime = eTime.join(':');
                    conflict = true;
                    break;
                }
            }
        }
        return { conflict, Ser_Req_Date, startTime, endTime };
    }
    ;
    Confirm_valid_date(date) {
        const updateDate = new Date(date.split("-").join("-"));
        console.log(updateDate);
        const todayDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        if (updateDate > todayDate) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    createData(date, time, userEmail, srId) {
        const data = {
            from: 'no_reply_helperland@gmail.com',
            to: userEmail,
            subject: 'Rescheduled service',
            html: `
            <h2>“Service Request with ID : ${srId} has been rescheduled by customer.Therefore Service is scheduled on ${date} at ${time}”.</h2>
            `
        };
        return data;
    }
    ;
    cancelData(userEmail, srId) {
        const data = {
            from: 'no_reply_helperland@gmail.com',
            to: userEmail,
            subject: 'Service Request is Cancelled now',
            html: `
            <h1>“Service Request with ID : ${srId} has been Cancelled by customer".</h1>
            `
        };
        return data;
    }
    ;
}
exports.DashboardService = DashboardService;
