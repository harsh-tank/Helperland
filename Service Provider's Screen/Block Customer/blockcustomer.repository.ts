import { db } from "../../models/index";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import moment from "moment";

export class BlockCustomerRepository {

    public async getCompletedSRofProvider(ProviderId:number):Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll({where:{ServiceProviderId:ProviderId, Status:3}})
    }

    public async updateUnBlockedCustofProvider(ProviderId:number, custId:number):Promise<[number,FavoriteAndBlocked[]]>{
        return db.FavoriteAndBlocked.update({IsBlocked:false},{where:{UserId:ProviderId, TargetUserId:custId}});
    }

    public async getUserDetailById(userId: number): Promise<User | null> {
    return db.User.findOne({where:{UserId:userId}});
    };

    public async createBlockUnblockCust(blockCustomer:{[key: number|string]:FavoriteAndBlocked}):Promise<FavoriteAndBlocked>{
        return db.FavoriteAndBlocked.create(blockCustomer);
    }

    public async getBlockedCustofSP(ProviderId:number, custId:number):Promise<FavoriteAndBlocked | null>{
    return db.FavoriteAndBlocked.findOne({where:{UserId:ProviderId, TargetUserId:custId}});
    }

    public async updateBlockedCustofSP(ProviderId:number, custId:number):Promise<[number,FavoriteAndBlocked[]]>{
        return db.FavoriteAndBlocked.update({IsBlocked:true},{where:{UserId:ProviderId, TargetUserId:custId}});
    }
}