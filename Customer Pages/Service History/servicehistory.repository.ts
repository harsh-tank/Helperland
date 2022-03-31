import { Op } from "sequelize";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { db } from "../../models/index";

export class ServiceHistoryRepository {

    public async getSRDetailById(srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({where: { ServiceRequestId: srId },include: ["ServiceRequestAddress", "ExtraService"],});
      }

    public async getSRHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({where: { UserId: userId ,  Status: {[Op.or]: [3, 4]}},});
      }

    public async getUser_DetailById(userId: number): Promise<User | null> {
        return db.User.findOne({where:{UserId:userId}});
      };

    public async Input_Ratings(ratings:{[key: number|string]:Rating}): Promise<Rating>{
        return db.Rating.create(ratings);
      }

    public async FetchRatingsBySR_Id(serviceRequestId:number): Promise<Rating | null>{
        return db.Rating.findOne({where:{ServiceRequestId:serviceRequestId}});
      }
}
