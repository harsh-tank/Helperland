import moment from "moment";
import { UserManagementRepository } from "./usermanagement.repository";
import { db } from "../../models/index";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { Print_data } from "./US_data";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class UserManagementService {
    public constructor(private readonly userManagementRepository: UserManagementRepository){ 
        this.userManagementRepository = userManagementRepository; 
      }

      public async UserType_in_String(typeId:number):Promise<string | null>{
        let US_String:(string | null);
        if(typeId === null){
            US_String = null;
        }else if(typeId === 1){
            US_String = 'Super User';
        }else if(typeId === 2){
            US_String = 'Admin';
        }else if(typeId === 3){
            US_String = 'Service Provider';
        }else if(typeId === 4){
            US_String = 'Customer';
        }else{
            US_String = 'Invalid Status';
        }
        return US_String;
      }

      public async make_user_active(us_Id:string):Promise<[number, User[]] | null>{
        const result = await this.userManagementRepository.getUserInfoById(+us_Id);
        if(result){
          if(result.IsActive){return null;
          }
          else{
            const active_now=await this.userManagementRepository.make_user_active(+us_Id);
            return active_now;
          }
        }else{
          return null;
        }
      }

      public async make_user_inactive(userId:string):Promise<[number, User[]] | null>{
        const result = await this.userManagementRepository.getUserInfoById(+userId);
        if(result){
          if(result.IsActive){
            const inactive_now=await this.userManagementRepository.make_user_inactive(+userId);
            return inactive_now;
          }
          else{return null;
          }
        }else{
          return null;
        }
      }  

      public async getAllUsers(): Promise<Print_data[] | null> {
        let Print_datas:Print_data[] = [];
        const result = await this.userManagementRepository.getAllUsers();
        if(result && result.length>0){
          for(let us in result){
  
            const userType = await this.UserType_in_String(result[us].UserTypeId);
  
            Print_datas.push({
              UserId: result[us].UserId,
              Name: result[us].FirstName +" "+ result[us].LastName,
              DateOfRegistration:result[us].createdAt.toLocaleDateString(),
              UserType:userType!,
              Phone: result[us].Mobile!,
              PostalCode : result[us].ZipCode!,
              Status: result[us].IsActive!
            })
          }
          const formated_data = Print_datas.sort(function(a,b){ return a.UserId - b.UserId;
           });
          return formated_data;
        }
        else{return null;
        }
      }

}
