import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { Provider_Detail } from "./details";

export class MySettingsRepository {

    public async update_User_DetailById(us_Id:number, user:Provider_Detail):Promise<[number, User[]]>{
        return db.User.update({
          FirstName:user.FirstName,LastName:user.LastName,
          Mobile:user.Mobile,DateOfBirth:user.DateOfBirth,
          NationalityId:user.NationalityId,Gender:user.GenderId,
          UserProfilePicture:user.ProfilePicture,ModifiedBy:us_Id,
          ZipCode:user.Address.PostalCode}, {where:{UserId:us_Id}});
      }

    public async get_User_Detail_ById(us_Id:number):Promise<User | null>{
      return db.User.findOne({attributes: {exclude: ['Password']},where:{UserId:us_Id, UserTypeId:3}, include:db.UserAddress});
    }

    public async get_User_ById(us_Id:number):Promise<User | null>{
        return db.User.findOne({where:{UserId:us_Id}});
    }

    public async get_Provider_Add_ById(ProviderId:number):Promise<UserAddress| null>{
        return db.UserAddress.findOne({where:{UserId:ProviderId}});
    }

    public async create_Add(us_Id:number, user:Provider_Detail){
        return db.UserAddress.create({
          AddressLine1:user.Address.StreetName,AddressLine2:user.Address.HouseNumber,
          PostalCode:user.Address.PostalCode,City:user.Address.City,
          IsDefault:true,IsDeleted:false,UserId:us_Id},)
      }

    public async update_User_Add(add_Id:number, user:Provider_Detail){
        return db.UserAddress.update({
          AddressLine1:user.Address.StreetName,AddressLine2:user.Address.HouseNumber,
          PostalCode:user.Address.PostalCode,City:user.Address.City}, {where:{AddressId:add_Id}})
      }

    public async get_User_Add_ById(us_Id:number):Promise<UserAddress| null>{
        return db.UserAddress.findOne({where:{UserId:us_Id, IsDeleted:false}});
    }

    public async change_Pass(us_Id:number, pass:string):Promise<[number,User[]]>{
        return db.User.update({Password:pass, ModifiedBy:us_Id},{where:{UserId:us_Id}});
    }
}