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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestService = void 0;
class ServiceRequestService {
    constructor(serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }
    getServiceRequestById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceRequestById(+requestId);
        });
    }
    getAllServiceRequestsOfProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getAllServiceRequestsOfProvider(+ProviderId);
        });
    }
    getServiceProviderDetailById(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceProviderDetailById(+ProviderId);
        });
    }
    getServiceProvidersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceProvidersByZipCode(zipCode);
        });
    }
    acceptNewSR(ser_Id, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.acceptNewSR(+ser_Id, +ProviderId);
        });
    }
    IsSPComfortableWithPets(includePets, serviceRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            let Ser_Req = [];
            if (includePets === false) {
                for (let x in serviceRequests) {
                    if (serviceRequests[x].HasPets === false) {
                        Ser_Req.push(serviceRequests[x]);
                    }
                }
            }
            else {
                return serviceRequests;
            }
            return Ser_Req;
        });
    }
    getAllUnAcceptedServiceRequestByZipcode(zipCode, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            let Ser_Req = [];
            const serviceRequest = yield this.serviceRequestRepository.getAllUnAcceptedServiceRequestByZipcode(zipCode);
            const blockedCustomer = yield this.serviceRequestRepository.getAllBlockedCustomerOfServiceProvider(+helperId);
            if (serviceRequest) {
                if (blockedCustomer) {
                    Ser_Req = serviceRequest.filter(sr => !blockedCustomer.find(rm => (rm.TargetUserId === sr.UserId)));
                }
            }
            return Ser_Req;
        });
    }
    PrintSRDetail(srequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let req_info = [];
            for (let x in srequest) {
                const user = yield this.serviceRequestRepository.getCustomerDetailById(srequest[x].UserId);
                const req_Add = yield this.serviceRequestRepository.getServiceRequestAddress(srequest[x].ServiceRequestId);
                const startTimeArray = srequest[x].ServiceStartTime.toString().split(":");
                const endTimeInt = (parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
                    srequest[x].ServiceHours + srequest[x].ExtraHours).toString().split(".");
                if (endTimeInt[1]) {
                    endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                }
                else {
                    endTimeInt[1] = "00";
                }
                if (user) {
                    if (req_Add) {
                        req_info.push({ ServiceId: srequest[x].ServiceRequestId, ServiceDate: srequest[x].ServiceStartDate.toString().split("-").reverse().join("-"), Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1],
                            Customer: user.FirstName + " " + user.LastName,
                            Address: { Street: req_Add.AddressLine1, HouseNumber: req_Add.AddressLine2, City: req_Add.City,
                                PostalCode: req_Add.PostalCode, }, Payment: srequest[x].TotalCost + " €" });
                    }
                }
            }
            return req_info;
        });
    }
    createEmail(userEmail, srId) {
        const data = {
            from: 'no_reply_helperland.com',
            to: userEmail,
            subject: 'Service Request Already Accepted',
            html: `
                <h3>A service request with ${srId} is No more Available, It is accepted by someone else.</h3>
                `
        };
        return data;
    }
    SPTimeConflict(date, ser_Req, acceptTotalHour, time) {
        let srId;
        let confirm = false;
        for (let x in ser_Req) {
            if (ser_Req[x].ServiceStartDate === date) {
                const acceptTime = time.toString().split(":");
                if (acceptTime[1] === "30") {
                    acceptTime[1] = "0.5";
                }
                const acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
                const availableTime = ser_Req[x].ServiceStartTime.toString().split(":");
                if (availableTime[1] === "30") {
                    availableTime[1] = "0.5";
                }
                const availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
                const availableTotalHour = ser_Req[x].ServiceHours + ser_Req[x].ExtraHours;
                const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
                const totalAvailableTime = availableStartTime + availableTotalHour + 1;
                if (availableStartTime >= totalAcceptTime || acceptStartTime >= totalAvailableTime) {
                    confirm = false;
                }
                else {
                    srId = ser_Req[x].ServiceRequestId;
                    confirm = true;
                    break;
                }
            }
            else {
                confirm = false;
            }
        }
        return { confirm, srId };
    }
}
exports.ServiceRequestService = ServiceRequestService;
