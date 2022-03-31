import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class ServiceRequestRepository {

    public async getServiceRequestById(requestId:number): Promise<ServiceRequest | null>{
        return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:1 }});
      }

    public async getServiceRequestAddress(requestId:number): Promise<ServiceRequestAddress | null>{
        return db.ServiceRequestAddress.findOne({where:{ServiceRequestId:requestId}});
      }

    public async getCustomerDetailById(userId:number): Promise<User | null>{
        return db.User.findOne({where:{UserId:userId, UserTypeId:4}});
      }

    public async getServiceProviderDetailById(ProviderId:number): Promise<User | null>{
        return db.User.findOne({where:{UserId:ProviderId, UserTypeId:3}});
      }

    public async getAllServiceRequestsOfProvider(ProviderId:number):Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll({where:{ServiceProviderId:ProviderId, Status:2}});
      }

    public async getAllUnAcceptedServiceRequestByZipcode(zipCode:string):Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll({where:{ZipCode:zipCode, Status:1}});
      }
    
    public async getAllBlockedCustomerOfServiceProvider(ProviderId:number):Promise<FavoriteAndBlocked[]|null>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:ProviderId, IsBlocked:true}});
      }

    public async acceptNewSR(ser_Id: number, ProviderId:number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ ServiceProviderId: ProviderId, Status:2, 
            ModifiedBy:ProviderId, SPAcceptedDate: new Date() },
          { where: { ServiceRequestId: ser_Id } }
        );
      }

    public async getServiceProvidersByZipCode(zipCode:string):Promise<User[]|null>{
        return db.User.findAll({where:{ZipCode:zipCode, UserTypeId:3}})
      }
}
