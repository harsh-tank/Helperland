import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequestRepository } from "./newservicerequest.repository";

export class ServiceRequestService {
    public constructor(private readonly serviceRequestRepository: ServiceRequestRepository){
        this.serviceRequestRepository = serviceRequestRepository;
      }
    
    public async getServiceRequestById(requestId: string): Promise<ServiceRequest | null> {
        return this.serviceRequestRepository.getServiceRequestById(+requestId);
      }

    public async getAllServiceRequestsOfProvider(ProviderId: string): Promise<ServiceRequest[] | null> {
        return this.serviceRequestRepository.getAllServiceRequestsOfProvider(+ProviderId);
      }  

    public async getServiceProviderDetailById(ProviderId: string): Promise<User | null> {
        return this.serviceRequestRepository.getServiceProviderDetailById(+ProviderId);
      }

    public async getServiceProvidersByZipCode(zipCode:string):Promise<User[]|null>{
        return this.serviceRequestRepository.getServiceProvidersByZipCode(zipCode);
      }

    public async acceptNewSR(ser_Id:string, ProviderId:string): Promise<[number, ServiceRequest[]]>{
        return this.serviceRequestRepository.acceptNewSR(+ser_Id, +ProviderId);
      }

    public async IsSPComfortableWithPets(includePets: boolean,serviceRequests: ServiceRequest[]) {
        let Ser_Req: ServiceRequest[] = [];
        if (includePets === false) {
          for (let x in serviceRequests) {
            if (serviceRequests[x].HasPets === false) {
                Ser_Req.push(serviceRequests[x]);
            }
          }
        } else {
          return serviceRequests;
        }
        return Ser_Req;
    }

    public async getAllUnAcceptedServiceRequestByZipcode(zipCode: string, helperId:string): Promise<ServiceRequest[] | null> {
        let Ser_Req:ServiceRequest[] = [];
        const serviceRequest = await this.serviceRequestRepository.getAllUnAcceptedServiceRequestByZipcode(zipCode);
        const blockedCustomer = await this.serviceRequestRepository.getAllBlockedCustomerOfServiceProvider(+helperId);
        if(serviceRequest){if(blockedCustomer){
            Ser_Req = serviceRequest.filter(sr => 
              !blockedCustomer.find(rm => 
                  (rm.TargetUserId === sr.UserId)
                ));
          }
        }
        return Ser_Req;
    }

    public async PrintSRDetail(srequest:ServiceRequest[]):Promise<Object[]>{
        let req_info:Object[] = [];
        for(let x in srequest){
          const user = await this.serviceRequestRepository.getCustomerDetailById(srequest[x].UserId);
          const req_Add = await this.serviceRequestRepository.getServiceRequestAddress(srequest[x].ServiceRequestId);
          const startTimeArray =srequest[x].ServiceStartTime.toString().split(":")!;
          const endTimeInt = (parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
            srequest[x].ServiceHours! + srequest[x].ExtraHours!
          ).toString().split(".");
          if (endTimeInt[1]) {
            endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
          } else {
            endTimeInt[1] = "00";
          }
          if(user){
            if(req_Add){
                req_info.push({ServiceId:srequest[x].ServiceRequestId,ServiceDate:srequest[x].ServiceStartDate.toString().split("-").reverse().join("-"),Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1],
                Customer: user.FirstName + " " + user.LastName,
                Address: {Street: req_Add.AddressLine1,HouseNumber: req_Add.AddressLine2,City: req_Add.City,
                  PostalCode: req_Add.PostalCode,},Payment:srequest[x].TotalCost+" €"})}}
        }
        return req_info;
      }

      public createEmail(userEmail:string, srId:string): typeof data{
        const data = {
            from: 'no_reply_helperland.com',
            to: userEmail,
            subject: 'Service Request Already Accepted',
            html: `
                <h3>A service request with ${srId} is No more Available, It is accepted by someone else.</h3>
                `
        }
        return data;
      }

      public SPTimeConflict(date: Date,ser_Req: ServiceRequest[],acceptTotalHour: number,time: number) {
        let srId;
        let confirm = false;
        for (let x in ser_Req) {
          if (ser_Req[x].ServiceStartDate === date) {
            const acceptTime = time.toString().split(":");
            if (acceptTime[1] === "30") {
              acceptTime[1] = "0.5";
            }
            const acceptStartTime =
              parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
    
            const availableTime =ser_Req[x].ServiceStartTime.toString().split(":");
            if (availableTime[1] === "30") {
              availableTime[1] = "0.5";
            }
            const availableStartTime =
              parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
            const availableTotalHour =
            ser_Req[x].ServiceHours + ser_Req[x].ExtraHours;
            const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
            const totalAvailableTime = availableStartTime + availableTotalHour + 1;
            if (availableStartTime >= totalAcceptTime ||acceptStartTime >= totalAvailableTime) {
              confirm = false;
            } else {
              srId = ser_Req[x].ServiceRequestId;
              confirm = true;
              break;
            }
          } else {
            confirm = false;
          }
        }
        return {confirm, srId};
      }
    
    

}