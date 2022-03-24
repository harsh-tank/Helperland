import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class UpcomingServicesRepository {
    public async cancelSR(srviceId: number, ProviderId:number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update(
          { Status:4, ModifiedBy:ProviderId },
          { where: { ServiceRequestId: srviceId } }
        );
      }

    public async getAllUpcomingSR(ProviderId:number):Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll({where:{ServiceProviderId:ProviderId, Status:2}});
      }

    public async completeSR(srviceId: number, ProviderId:number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update(
          { Status:3, ModifiedBy:ProviderId},
          { where: { ServiceRequestId: srviceId } }
        );
      }

    public async getServiceRequestById(requestId:number): Promise<ServiceRequest | null>{
        return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:2 }});
      }

    public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({
          where: { ServiceRequestId: srId },
          include: ["ServiceRequestAddress", "ExtraService"],
        });
      }
}