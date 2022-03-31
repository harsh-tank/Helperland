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
exports.ServiceRequestsService = void 0;
const moment_1 = __importDefault(require("moment"));
class ServiceRequestsService {
    constructor(serviceRequestsRepository) {
        this.serviceRequestsRepository = serviceRequestsRepository;
        this.serviceRequestsRepository = serviceRequestsRepository;
    }
    show_ser_duration(ser_Req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sTList = ser_Req.ServiceStartTime.toString().split(':');
            const startTime = sTList[0] + ":" + sTList[1];
            if (sTList[1] === "30") {
                sTList[1] = "0.5";
            }
            else {
                sTList[1] = "0";
            }
            const endTimeVal = parseFloat(sTList[0]) + parseFloat(sTList[1]) + ser_Req.ServiceHours + ser_Req.ExtraHours;
            const eTList = endTimeVal.toString().split('.');
            if (eTList[1] === '5') {
                eTList[1] = '30';
            }
            else {
                eTList[1] = '00';
            }
            const Req_duration = startTime + " - " + eTList[0] + ":" + eTList[1];
            return Req_duration;
        });
    }
    give_string_status(status) {
        return __awaiter(this, void 0, void 0, function* () {
            let String_st;
            if (status === null) {
                String_st = null;
            }
            else if (status === 1) {
                String_st = 'New';
            }
            else if (status === 2) {
                String_st = 'Pending';
            }
            else if (status === 3) {
                String_st = 'Completed';
            }
            else if (status === 4) {
                String_st = 'Cancelled';
            }
            else if (status === 5) {
                String_st = 'Refunded';
            }
            else {
                String_st = 'Invalid Status';
            }
            return String_st;
        });
    }
    getAllSR() {
        return __awaiter(this, void 0, void 0, function* () {
            let Print_Req = [];
            let provider;
            let ratings;
            const ser_Req = yield this.serviceRequestsRepository.getAllSR();
            if (ser_Req && ser_Req.length > 0) {
                for (let x in ser_Req) {
                    const customer = yield this.serviceRequestsRepository.getUserInfoById(ser_Req[x].UserId);
                    const address = yield this.serviceRequestsRepository.get_SR_Address(ser_Req[x].ServiceRequestId);
                    if (ser_Req[x].ServiceProviderId) {
                        provider = yield this.serviceRequestsRepository.getUserInfoById(ser_Req[x].ServiceProviderId);
                    }
                    else {
                        provider = null;
                    }
                    if (provider) {
                        ratings = yield this.serviceRequestsRepository.getRatings(customer === null || customer === void 0 ? void 0 : customer.UserId, provider.UserId, ser_Req[x].ServiceRequestId);
                    }
                    else {
                        ratings = null;
                    }
                    const time = yield this.show_ser_duration(ser_Req[x]);
                    const status = yield this.give_string_status(ser_Req[x].Status);
                    Print_Req.push({
                        ServiceId: ser_Req[x].ServiceRequestId,
                        ServiceDate: {
                            Date: ser_Req[x].ServiceStartDate.toString().split('-').reverse().join('/'),
                            Time: time
                        },
                        CustomerDetails: {
                            Name: (customer === null || customer === void 0 ? void 0 : customer.FirstName) + " " + (customer === null || customer === void 0 ? void 0 : customer.LastName), UserId: customer === null || customer === void 0 ? void 0 : customer.UserId,
                            Address: {
                                StreetName: address === null || address === void 0 ? void 0 : address.AddressLine1,
                                HouseNumber: address === null || address === void 0 ? void 0 : address.AddressLine2,
                                PostalCode: address === null || address === void 0 ? void 0 : address.PostalCode,
                                City: address === null || address === void 0 ? void 0 : address.City
                            }
                        },
                        ServiceProvider: {
                            Name: (provider === null || provider === void 0 ? void 0 : provider.FirstName) + " " + (provider === null || provider === void 0 ? void 0 : provider.LastName), ServiceProviderId: provider === null || provider === void 0 ? void 0 : provider.UserId,
                            ProfilePicture: provider === null || provider === void 0 ? void 0 : provider.UserProfilePicture, Ratings: ratings === null || ratings === void 0 ? void 0 : ratings.Ratings
                        },
                        GrossAmount: ser_Req[x].TotalCost,
                        NetAmount: ser_Req[x].TotalCost,
                        Discount: ser_Req[x].Discount,
                        Status: status,
                        PaymentStatus: ser_Req[x].PaymentDone,
                        HasIssue: ser_Req[x].HasIssue
                    });
                }
                const format_data = Print_Req.sort(function (a, b) { return a.ServiceId - b.ServiceId; });
                return format_data;
            }
            else {
                return null;
            }
        });
    }
    getSRById(req_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestsRepository.getSRById(+req_Id);
        });
    }
    SendEmail_for_Add_Upd(userEmail, address) {
        const data = {
            from: 'no_reply_helperland@gmail.com',
            to: userEmail,
            subject: 'Updated Address of SR',
            html: `
                    <h2>Address of SR with ID ${address.ServiceRequestId} has been changed by admin.</h2>
                    </br>
                    <h3>New Service Address is</h3>
                    </br>
                    <p>Street: ${address.AddressLine1}</p>
                    </br>
                    <p>House Number: ${address.AddressLine2}</p>
                    </br>
                    <p>City: ${address.City}</p>
                    </br>
                    <p>Postal Code: ${address.PostalCode}</p>
                    `
        };
        return data;
    }
    filter_feature_SR(requests, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter_Info;
            if (filters.ServiceRequestId) {
                filter_Info = requests.filter(x => {
                    return x.ServiceId === filters.ServiceRequestId;
                });
            }
            if (filters.Status) {
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return x.Status === filters.Status;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return x.Status === filters.Status;
                    });
                }
            }
            if (filters.PostalCode) {
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return x.CustomerDetails.Address.PostalCode === filters.PostalCode;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return x.CustomerDetails.Address.PostalCode === filters.PostalCode;
                    });
                }
            }
            if (filters.Cust_Name) {
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return x.CustomerDetails.Name === filters.Cust_Name;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return x.CustomerDetails.Name === filters.Cust_Name;
                    });
                }
            }
            if (filters.SP_Name) {
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return x.ServiceProvider.Name === filters.SP_Name;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return x.ServiceProvider.Name === filters.SP_Name;
                    });
                }
            }
            if (filters.HasIssue != null) {
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => { return x.HasIssue === filters.HasIssue; });
                }
                else {
                    filter_Info = requests.filter(x => { return x.HasIssue === filters.HasIssue; });
                }
            }
            if (filters.FromDate) {
                const fromDate = new Date(filters.FromDate.split('-').reverse().join('-'));
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate;
                    });
                }
            }
            if (filters.ToDate) {
                const toDate = new Date(filters.ToDate.split('-').reverse().join('-'));
                if (filter_Info) {
                    filter_Info = filter_Info.filter(x => {
                        return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) <= toDate;
                    });
                }
                else {
                    filter_Info = requests.filter(x => {
                        return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) <= toDate;
                    });
                }
            }
            if (filters.Email) {
                const us = yield this.serviceRequestsRepository.getUserByEmail(filters.Email);
                if (us) {
                    if (filter_Info) {
                        filter_Info = filter_Info.filter(x => {
                            return x.CustomerDetails.UserId === us.UserId || x.ServiceProvider.ServiceProviderId === us.UserId;
                        });
                    }
                    else {
                        filter_Info = requests.filter(x => {
                            return x.CustomerDetails.UserId === us.UserId || x.ServiceProvider.ServiceProviderId === us.UserId;
                        });
                    }
                }
                else {
                    filter_Info = [];
                }
            }
            return filter_Info;
        });
    }
    SendEmail_For_SR_upd(userEmail, address) {
        const data = {
            from: 'no_reply_heleperland@gmail.com',
            to: userEmail,
            subject: 'SR is now Updated and rescheduled',
            html: `
                    <h2>SR with ID ${address.ServiceRequestId} has been rescheduled and address is updated by admin.</h2>
                    </br>
                    <h3>New Address is</h3>
                    </br>
                    <p>Street: ${address.AddressLine1}</p>
                    </br>
                    <p>House Number: ${address.AddressLine2}</p>
                    </br>
                    <p>City: ${address.City}</p>
                    </br>
                    <p>Postal Code: ${address.PostalCode}</p>
                    </br>
                    <h3>Changed Time</h3>
                    <p>Date: ${address.ServiceStartDate}</p>
                    </br>
                    <h3>Changed Date</h3>
                    <p>Time: ${address.ServiceTime}</p>
                    `
        };
        return data;
    }
    Same_Reschedule_check(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirm = false;
            const ser_Req = yield this.serviceRequestsRepository.getSRById(body.ServiceRequestId);
            if (ser_Req) {
                const enteredDate = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
                const srDate = new Date(ser_Req.ServiceStartDate);
                if (enteredDate > srDate || enteredDate < srDate) {
                    confirm = false;
                }
                else {
                    confirm = true;
                }
            }
            return confirm;
        });
    }
    reschedule_SR(body, us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const SR_date = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
            const reschedule_SR = yield this.serviceRequestsRepository.reschedule_SR(SR_date, body, +us_Id);
            return reschedule_SR;
        });
    }
    ValidatedDate(date) {
        const enteredDate = new Date(date.split("/").reverse().join("-"));
        const todayDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        if (enteredDate > todayDate) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    SendEmail_for_Reschedule_SR(userEmail, body) {
        const data = {
            from: 'no_reply_helperland@gmail.com',
            to: userEmail,
            subject: 'Reschedule SR',
            html: `
                    <h3>Service request with Service ID ${body.ServiceRequestId} has been rescheduled by admin.</h3>
                    <h3>New date and time is ${body.ServiceStartDate} and ${body.ServiceTime}</h3>
                    `
        };
        return data;
    }
    upd_SR(req_Id, us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestsRepository.upd_SR(+req_Id, +us_Id);
        });
    }
    SendEmail(userEmail, srId) {
        const data = {
            from: 'no_reply_helperland@gmail.com',
            to: userEmail,
            subject: 'Cancelled SR',
            html: `
                    <h3>Service request with Service Id ${srId} has been cancelled by admin.</h3>
                    `
        };
        return data;
    }
    upd_SR_Add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const req_Add = yield this.serviceRequestsRepository.get_SR_Address(body.ServiceRequestId);
            let upd_Add;
            if (req_Add) {
                if (req_Add.AddressLine1 === body.AddressLine1 && req_Add.AddressLine2 === body.AddressLine2 && req_Add.City === body.City && req_Add.PostalCode === body.PostalCode) {
                    upd_Add = null;
                }
                else {
                    upd_Add = yield this.serviceRequestsRepository.upd_SR_Add(body);
                }
            }
            else {
                upd_Add = null;
            }
            return upd_Add;
        });
    }
    User_SP_mail(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const mail_list = [];
            const user = yield this.serviceRequestsRepository.getUserInfoById(serviceRequest.UserId);
            const SP = yield this.serviceRequestsRepository.getUserInfoById(serviceRequest.ServiceProviderId);
            if (serviceRequest.UserId && user) {
                mail_list.push(user.Email);
            }
            if (serviceRequest.ServiceProviderId && SP) {
                mail_list.push(SP.Email);
            }
            return mail_list;
        });
    }
    Return_refund(srId, rf, us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ser_Req = yield this.serviceRequestsRepository.getSRDetailById(srId);
            if (ser_Req && ser_Req.HasIssue === true) {
                return this.serviceRequestsRepository.Return_refund(srId, rf, us_Id);
            }
            else {
                return null;
            }
        });
    }
}
exports.ServiceRequestsService = ServiceRequestsService;
