import moment from "moment";
import { db } from "../../models/index";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class UserManagementRepository {

    public async getAllUsers():Promise<User[] | null>{
      return db.User.findAll({where:{UserTypeId:{[Op.or]:[3,4]}}});
    }

    public async make_user_active(userId:number): Promise<[number, User[]]>{
      return db.User.update({IsActive:true},{where:{UserId:userId}});
    }
  
    public async make_user_inactive(userId:number): Promise<[number, User[]]>{
      return db.User.update({IsActive:false},{where:{UserId:userId}});
    }

    public async getUserInfoById(userId:number): Promise<User | null>{
        return db.User.findOne({where:{UserId:userId, UserTypeId:{[Op.or]:[3,4]}}});
    }
  }