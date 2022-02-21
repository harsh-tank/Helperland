import { db } from "../models/index";
import { User } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { ServiceRequestAddress } from "../models/servicerequestaddress";
import { ServiceRequestExtra } from "../models/servicerequestextra";

export class BookServiceRepository{

    public async createUserAddress(userAddress: {[key: number|string]:UserAddress}): Promise<UserAddress>{
        return db.UserAddress.create(userAddress);
    }

    public async createFavoriteAndBlocked(favoriteandblocked: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
        return db.FavoriteAndBlocked.create(favoriteandblocked);
    }

    public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId}});
    }

    public async getUserAddress(userId:number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({where:{UserId:userId}});
    }

    public async getUserById(userId: number[]): Promise<User[]> {
        return db.User.findAll({where:{UserId:userId}});
    }

    public async getAllProvider(): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3}});
    }

    public async getUserByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }

    public async getProviderByZipcode(zipCode:string): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3, ZipCode:zipCode}});
    }


    
    public async createServiceRequest(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest);
    }
    public async createServiceRequestWithAddress(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest,{include:['ServiceRequestAddress', 'ExtraService']});
    }


}