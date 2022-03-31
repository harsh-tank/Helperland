import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import bcrypt from "bcrypt";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { Op } from "sequelize";
import mailgun from "mailgun-js";

export class FavoriteProviderRepository {

    public async create_Fav_Provider(favorite:{[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked|null> {
        return db.FavoriteAndBlocked.create(favorite);
    }

    public async get_Provider_Cust_Relation(us_Id: number[]): Promise<User[] | null> {
        return db.User.findAll({where: { UserTypeId: 3 ,  UserId: {[Op.or]: us_Id}}, 
          include:'TargetUserId'
        });
      }

    public async getAllSRByUserId(us_Id:number): Promise<ServiceRequest[]>{
      return db.ServiceRequest.findAll({where:{UserId:us_Id}});
    }

    public async update_Block_Provider(block:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return db.FavoriteAndBlocked.update({ IsBlocked: block.IsBlocked},{ where: { UserId:block.UserId, TargetUserId:block.TargetUserId } });
      }

    public async get_Fav_Provider(us_Id: number, Provider_Id:number): Promise<FavoriteAndBlocked|null> {
        return db.FavoriteAndBlocked.findOne({where:{UserId:us_Id, TargetUserId:Provider_Id}});
    }

    public async update_Fav_Provider(fav:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return db.FavoriteAndBlocked.update({ IsFavorite: fav.IsFavorite},{ where: { UserId:fav.UserId, TargetUserId:fav.TargetUserId } });
      }
}
