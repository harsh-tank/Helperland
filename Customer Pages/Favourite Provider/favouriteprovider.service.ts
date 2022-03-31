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
import { FavoriteProviderRepository } from "./favouriteprovider.repository";

export class FavoriteProviderService {
    public constructor(private readonly favoriteProviderRepository: FavoriteProviderRepository) {
      this.favoriteProviderRepository = favoriteProviderRepository;
    };

    public get_ProviderId_Cust_Relation(sR:ServiceRequest[]){
        const ProviderId = [];
        for(let x in sR){
          if(sR[x].Status === 3 && sR[x].ServiceProviderId != null){
            ProviderId.push(sR[x].ServiceProviderId);}}
            return ProviderId;
        }

      public async getAllSRByUserId(us_Id:number):Promise<ServiceRequest[]>{
        return this.favoriteProviderRepository.getAllSRByUserId(us_Id);
      }

      public async get_Provider_Cust_Relation(us_Id:number[]):Promise<User[] | null>{
        return this.favoriteProviderRepository.get_Provider_Cust_Relation(us_Id);
      }

    public async update_Block_Provider(block:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return this.favoriteProviderRepository.update_Block_Provider(block);
      }  

    public async create_Fav_Provider(fav:{[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked|null> {
        return this.favoriteProviderRepository.create_Fav_Provider(fav);
      }

    public async update_Fav_Provider(fav:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return this.favoriteProviderRepository.update_Fav_Provider(fav);
      }

    public async get_Fav_Provider(us_Id: number, ProviderId:number): Promise<FavoriteAndBlocked|null> {
        return this.favoriteProviderRepository.get_Fav_Provider(us_Id, ProviderId);
      }
    
}