import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";
import { ServiceHistoryRepository } from "./servicehistory.repository";

export class ServiceHistoryService {
    public constructor(private readonly serviceHistoryRepository: ServiceHistoryRepository) {
        this.serviceHistoryRepository = serviceHistoryRepository;
      }

    public async getUserDetailById(userId: number): Promise<User | null> {
        return this.serviceHistoryRepository.getUserDetailById(userId);
      } 

    public async getSRDetailById(srId: number): Promise<ServiceRequest | null> {
        return this.serviceHistoryRepository.getSRDetailById(srId);
      }

    public async getSRHistoryOfProvider(userId: number): Promise<ServiceRequest[] | null> {
        return this.serviceHistoryRepository.getSRHistoryOfProvider(userId);
      }  

    public async getRatingsOfProvider(ProviderId: string): Promise<Rating[] | null> {
        return this.serviceHistoryRepository.getRatingsOfProvider(+ProviderId);
      } 

    public async Push_Service_Data(ser_Req: ServiceRequest[]): Promise<Object[]>{
        let push_History: Object[] = [];
    
        for (let history in ser_Req) {
          let user = await this.serviceHistoryRepository.getUserDetailById(ser_Req[history].UserId);
          push_History.push({ServiceId: ser_Req[history].ServiceRequestId,
            StartDate: ser_Req[history].ServiceStartDate,
            Customer: user?.FirstName! + " " + user?.LastName!,
            Payment: ser_Req[history].TotalCost,
          });
        }
        return push_History;
      }

    public async PrintSRHistory(serviceRequest: ServiceRequest[]) {
        let Push_Data: Object[] = [];
        for (let x in serviceRequest) {let user = await this.serviceHistoryRepository.getUserDetailById(serviceRequest[x].UserId);
        let address = await this.serviceHistoryRepository.getServiceAddress(serviceRequest[x].ServiceRequestId);
    
          const st_TimeArray =serviceRequest[x].ServiceStartTime.toString().split(":")!;
          const endTimeInt = (parseFloat(st_TimeArray[0]) +parseFloat(st_TimeArray[1]) / 60 +serviceRequest[x].ServiceHours! +
            serviceRequest[x].ExtraHours!
          ).toString().split(".");
          if (endTimeInt[1]) {
            endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
          } else {
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
                Time:st_TimeArray[0]+":"+st_TimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1]});}
          }
        }
        return Push_Data;
      }
    
    public ValidateDateWithCurrent(requestHistory: ServiceRequest[]) {
        const srHistory: ServiceRequest[] = [];
        const Today_date = new Date(moment(new Date()).format("YYYY-MM-DD"));
    
        for (let sr in requestHistory) {
          const date = requestHistory[sr].ServiceStartDate;
          const SRDate = new Date(moment(date).format("YYYY-MM-DD"));
    
          if (SRDate <= Today_date) {
            srHistory.push(requestHistory[sr]);
          }
        }
        return srHistory;
      }

      public async PrintRatingsofSP(ratings: Rating[]): Promise<Object[]> {
        let push_Data: Object[] = [];
        for (let rate in ratings) {
          let serviceRequest =await this.serviceHistoryRepository.getSRDetailById(ratings[rate].ServiceRequestId)!;
    
          const st_TimeArray =serviceRequest?.ServiceStartTime.toString().split(":")!;
          const end_Time = (parseFloat(st_TimeArray[0]) +parseFloat(st_TimeArray[1]) / 60 +
            serviceRequest?.ServiceHours! +serviceRequest?.ExtraHours!).toString().split(".");
    
          if (end_Time[1]) {
            end_Time[1] = (parseInt(end_Time[1]) * 6).toString();
          } else {
            end_Time[1] = "00";
          }
    
          let user = await this.serviceHistoryRepository
            .getUserDetailById(ratings[rate].RatingFrom)!
            .then((user) => {
              if(serviceRequest){
                if(user){
                  push_Data.push({
                    ServiceId: ratings[rate].ServiceRequestId,
                    StartDate:serviceRequest.ServiceStartDate.toString().split("-").reverse().join("-"),
                    Customer: user.FirstName + " " + user.LastName,
                    CustomerComment: ratings[rate].Comments,
                    Ratings: ratings[rate].Ratings,
                    Time:st_TimeArray[0]+":"+st_TimeArray[1]+"-"+end_Time[0]+":" +end_Time[1]
                  });
                }
              }
            });
        }
        return push_Data;
      }
}