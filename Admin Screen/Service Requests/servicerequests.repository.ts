import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { filter_features,upd_SR_data ,Print_Req_Data } from "./request_handle";

export class ServiceRequestsRepository {
    public async reschedule_SR(date:Date,body: upd_SR_data, userId:number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ ServiceStartDate: date, ServiceStartTime: body.ServiceTime, ModifiedBy:userId },
          { where: { ServiceRequestId: body.ServiceRequestId } });
      }

    public async  getAllSR():Promise<ServiceRequest[] | null>{
        return db.ServiceRequest.findAll();
      }
     
    public async get_SR_Address(req_Id:number): Promise<ServiceRequestAddress | null>{
        return db.ServiceRequestAddress.findOne({where:{ServiceRequestId:req_Id}});
      }  

    public async getRatings(us_Id:number,SPId:number,req_Id:number): Promise<Rating | null>{
        return db.Rating.findOne({where:{RatingFrom: us_Id,RatingTo: SPId,ServiceRequestId:req_Id}});
      }  

    public async getUserByEmail(email:string): Promise<User| null>{
        return db.User.findOne({where:{Email:email}});
      }  

    public async getUserInfoById(us_Id:number): Promise<User | null>{
        return db.User.findOne({where:{UserId:us_Id}});
      }  

    public async getSRById(req_Id:number):Promise<ServiceRequest | null>{
        return db.ServiceRequest.findOne({where:{ServiceRequestId:req_Id}});
      }

    public async upd_SR_Add(body:upd_SR_data):Promise<[number, ServiceRequestAddress[]]>{
        return db.ServiceRequestAddress.update({
          AddressLine1:body.AddressLine1,AddressLine2:body.AddressLine2,
          City:body.City,PostalCode: body.PostalCode},{where:{ServiceRequestId:body.ServiceRequestId}});
      }

    public async getSRDetailById(srId:number): Promise<ServiceRequest | null>{
        return db.ServiceRequest.findOne({where:{ServiceRequestId:srId, Status:3}});
      }  

    public async upd_SR(req_Id:number, us_Id:number):Promise<[number, ServiceRequest[]]>{
        return db.ServiceRequest.update({Status:4, ModifiedBy:us_Id},{where:{ServiceRequestId:req_Id}});
      }

    public async Return_refund(srId:number, rf:number, us_Id:number):Promise<[number, ServiceRequest[]]>{
        return db.ServiceRequest.update({RefundedAmount:rf, Status:5,ModifiedBy:us_Id},
          {where:{ServiceRequestId:srId}})
      }
}