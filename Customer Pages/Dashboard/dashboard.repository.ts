import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class DashboardRepository {

    public async getSRDetailById(srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({
          where: { ServiceRequestId: srId },
          include: ["ServiceRequestAddress", "ExtraService"],
        });
      }

    public async getAllSROfProvider(providerId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({
          where: { ServiceProviderId: providerId },
        });
      }

      public async rescheduleSR(date: Date,time: string,srId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update(
          { ServiceStartDate: date, ServiceStartTime: time },
          { where: { ServiceRequestId: srId } }
        );
      }

      public async getAllSRByUserId(userId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({where: { UserId: userId, Status:1 },
          include: [
            "ProviderRequest",
            "UserServiceRequest",
            "ExtraService",
            "UserServiceRequest",
            "ServiceRequestAddress",
          ],
        });
      }

      public async updateSR(srId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({Status:4},{where:{ServiceRequestId: srId }});
      }

      public async getProviderById(providerId:number):Promise<User | null>{
        return db.User.findOne({where:{UserId:providerId, UserTypeId:3}});
      }
}