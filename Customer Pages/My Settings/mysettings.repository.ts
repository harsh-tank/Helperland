import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { UserAddress } from "../../models/useraddress";

export class MySettingsRepository {
    public async get_User_AddById(userId:number):Promise<UserAddress[]| null>{
        return db.UserAddress.findAll({where:{UserId:userId, IsDeleted:false}});
      }

    public async get_User_AddByAdd_Id(addressId:number, userId:number):Promise<UserAddress| null>{
        return db.UserAddress.findOne({where:{AddressId:addressId, UserId:userId}});
      }

    public async update_User_AddByAdd_Id(addressId:number, userId:number, userAddress:UserAddress):Promise<[number,UserAddress[]]>{
        return db.UserAddress.update({Addressline1:userAddress.AddressLine1,Addressline2:userAddress.AddressLine2,PostalCode:userAddress.PostalCode,
          City:userAddress.City,Mobile:userAddress.Mobile},
          {where:{AddressId:addressId, UserId:userId}})
      }

    public async get_User_DetailById(userId:number):Promise<User | null>{
        return db.User.findOne({where:{UserId:userId, UserTypeId:4}});
      }

    public async update_User_DetailById(userId:number, up_user:User):Promise<[number, User[]]>{
        return db.User.update({FirstName:up_user.FirstName,LastName:up_user.LastName,Mobile:up_user.Mobile,
          DateOfBirth:up_user.DateOfBirth,LanguageId:up_user.LanguageId,ModifiedBy:userId}, 
          {where:{UserId:userId}});
      }
    
    public async get_User_ById(userId:number):Promise<User | null>{
        return db.User.findOne({where:{UserId:userId}});
      }
    
    public async create_Add(userAddress:{[key: number|string]:ServiceRequest}):Promise<UserAddress>{
        return db.UserAddress.create(userAddress);
      }

    public async delete_Add(addressId:number, userId:number){
        return db.UserAddress.update({IsDeleted:true},{where:{AddressId:addressId, UserId:userId}});
      }

    public async change_Pass(userId:number, password:string):Promise<[number,User[]]>{
        return db.User.update({Password:password, ModifiedBy:userId},{where:{UserId:userId}});
      }
    
}