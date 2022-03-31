import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";

export class ServiceHistoryRepository {

    public async getRatingsOfProvider(ProviderId:number):Promise<Rating[]|null>{
        return db.Rating.findAll({where:{RatingTo:ProviderId},include:["RatingServiceRequest"]});
      }

    public async getSRHistoryOfProvider(ProviderId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({
          where: { ServiceProviderId: ProviderId ,  Status:3}, 
          include:["ServiceRequestAddress", "UserServiceRequest"]
        });
      }
    
    public async getSRDetailById(srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({
          where: { ServiceRequestId: srId },
          include: ["ServiceRequestAddress", "ExtraService"],
        });
      }

    public async getServiceAddress(requestId: number): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({where:{ServiceRequestId:requestId}});
      };

    public async getUserDetailById(userId: number): Promise<User | null> {
        return db.User.findOne({where:{UserId:userId}});
      };

    public async getCompletedSRofProvider(ProviderId:number):Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll({where:{ServiceProviderId:ProviderId, Status:3}})
      }
}