import { UpcomingServicesRepository } from "./upcomingservices.repository";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";

export class UpcomingService {
    public constructor(private readonly upcomingServicesRepository: UpcomingServicesRepository) {
        this.upcomingServicesRepository = upcomingServicesRepository;
      }

    public async getAllUpcomingSR(ProviderId:string):Promise<ServiceRequest[] | null>{
        return this.upcomingServicesRepository.getAllUpcomingSR(+ProviderId)
        .then(ser_Req => {
          const sRequest:ServiceRequest[] = [];
          const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
          if(ser_Req){
            for(let sr in ser_Req){
              let serviceRequestDate = new Date(ser_Req[sr].ServiceStartDate);
              if(currentDate > serviceRequestDate ){
                continue;
              }
              sRequest.push(ser_Req[sr]);
            }
          }
          return sRequest;
        });
      }

      public async cancelSR(serviceId:string, ProviderId:string): Promise<[number, ServiceRequest[]]>{
        return this.upcomingServicesRepository.cancelSR(+serviceId,+ProviderId);
      }

      public async completeSR(serviceId:string,ProviderId:string): Promise<[number, ServiceRequest[]]>{
        return this.upcomingServicesRepository.completeSR(+serviceId,+ProviderId);
     }

     public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> {
        return this.upcomingServicesRepository.getServiceDetailById(srId);
    }

      public async getServiceRequestById(requestId: string): Promise<ServiceRequest | null> {
        return this.upcomingServicesRepository.getServiceRequestById(parseInt(requestId));
      }

      public async isValidRequestTime(serviceRequest: ServiceRequest): Promise<ServiceRequest | null> {
        const cur_Date = new Date(moment(new Date()).format("YYYY-MM-DD"));
        const sRequestDate = new Date(serviceRequest!?.ServiceStartDate);
        var time = serviceRequest.ServiceStartTime.toString().split(":");
        const requestTime = parseFloat(time[0]) + parseFloat(time[1]) / 60;
        const requestTotalTime =requestTime + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
        const cur_TotalTime =new Date().getHours() + new Date().getMinutes() / 60;
    
        if (sRequestDate < cur_Date) {
          return serviceRequest;
        } 
        else if (sRequestDate > cur_Date) {
          return null;
        } 
        else {
          if (requestTotalTime < cur_TotalTime) 
          {
            return serviceRequest;
          } 
          else 
          {
            return null;
          }
        }
      }

      public async getServiceRequestForCR(requestId: string): Promise<ServiceRequest | null> {
        return this.upcomingServicesRepository.getServiceRequestById(parseInt(requestId))
      }
}