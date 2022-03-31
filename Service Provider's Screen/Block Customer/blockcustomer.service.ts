import { db } from "../../models/index";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { BlockCustomerRepository } from "./blockcustomer.repository";
import moment from "moment";
type Cust = {UserId:number,Name:string}

export class BlockCustomerService {
    public constructor(private readonly blockCustomerRepository: BlockCustomerRepository) {
        this.blockCustomerRepository = blockCustomerRepository;
      }

    public async getBlockedCustomer(ProviderId:string, custId:string):Promise<FavoriteAndBlocked | null>{
        return this.blockCustomerRepository.getBlockedCustofSP(+ProviderId, +custId);
      }  

    public async getUserDetailById(userId: number): Promise<User | null> {
        return this.blockCustomerRepository.getUserDetailById(userId);
      } 

    public async updateUnBlockedCustofProvider(ProviderId:string, custId:string):Promise<[number,FavoriteAndBlocked[]]>{
        return this.blockCustomerRepository.updateUnBlockedCustofProvider(+ProviderId, +custId);
      }
    
    public async IsCustProviderRelated(ProviderId:string, custId:string):Promise<boolean>{
        let confirm  = false;
        const custIntId = +custId;
        let customers = await this.getCompletedSRofProvider(+ProviderId);
        if(customers){
          for(let x in customers){
            if(customers[x].UserId == custIntId){confirm =  true;break;}
            else{confirm = false;}
          }
        }
        else{confirm =  false;}
        return confirm;
      }  

    public async getCompletedSRofProvider(ProviderId:number):Promise<Cust[]>{
        let cust:Cust[] = [];
        const ser_Req = await this.blockCustomerRepository.getCompletedSRofProvider(ProviderId);
        if(ser_Req){
          if(ser_Req.length>0){
            for(let x in ser_Req){
              const user = await this.blockCustomerRepository.getUserDetailById(ser_Req[x].UserId);
              if(user){
                cust.push({Name: user.FirstName!+" "+user.LastName!,UserId: user.UserId})
              }}}
        }
        const userIds =cust.map(o => o.UserId)
        const Result_info =cust.filter(({UserId}, index) => !userIds.includes(UserId,index+1)) 
        return Result_info;
    };

    public async updateBlockedCustofSP(ProviderId:string, custId:string):Promise<[number,FavoriteAndBlocked[]]>{
        return this.blockCustomerRepository.updateBlockedCustofSP(+ProviderId, +custId);
      }

    public async createBlockUnblockCust(blockCustomer:{[key: number|string]:FavoriteAndBlocked}):Promise<FavoriteAndBlocked>{
        return this.blockCustomerRepository.createBlockUnblockCust(blockCustomer);
      }
}