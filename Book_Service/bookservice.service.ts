import jwt from "jsonwebtoken";
import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookservice.repository";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { ServiceRequestAddress } from "../models/servicerequestaddress"
import moment from "moment";

export class BookService {
  public constructor(private readonly bookServiceRepository: BookServiceRepository) {
    this.bookServiceRepository = bookServiceRepository;
  }

  public async createUserAddress(userAddress: {[key: number | string]: UserAddress;}): Promise<UserAddress> {
    return this.bookServiceRepository.createUserAddress(userAddress);
  }

  public async createFavoriteAndBlocked(favoriteandblocked: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
    return this.bookServiceRepository.createFavoriteAndBlocked(favoriteandblocked);
}

  public async getUserAddress(userId:number): Promise<UserAddress[]> {
    return this.bookServiceRepository.getUserAddress(userId);
  }

  public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
    return this.bookServiceRepository.getFavoriteAndBlocked(userId);
}

  public async getProviderById(userId: number): Promise<User|null> {
  return this.bookServiceRepository.getProviderById(userId);
  }

  public async getUserById(userId: number[]): Promise<User[]> {
    return this.bookServiceRepository.getUserById(userId);
}

  public async getAllProvider(): Promise<User[]> {
    return this.bookServiceRepository.getAllProvider();
  }

  public async getProviderByZipCode(zipCode:string): Promise<User[]> {
    return this.bookServiceRepository.getProviderByZipcode(zipCode);
  }

  public async getAllBlockedProviderofUser(userId:number, Providers:User[]):Promise<FavoriteAndBlocked[]|null>{
    const ProviderIds:number[] = [];
    for(let us in Providers){
      ProviderIds.push(Providers[us].UserId);
    }
    return this.bookServiceRepository.getAllBlockedProviderofUser(userId, ProviderIds);
  }

  public createToken(userEmail: string, ZipCode: string): string {
    const token = jwt.sign({ userEmail, ZipCode }, process.env.SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }

  public async getRequiredUser(user:FavoriteAndBlocked[], zipCode:string):Promise<Object[]>{
    let ProviderId:number[] = [];
    let fav_Provider_Detail = [];
    for(let x in user){
      ProviderId.push(user[x].TargetUserId);
    }
    const helperblock = await this.bookServiceRepository.getAllBlockCustOfProvider(ProviderId);

    const fav_SP = user.filter(ar => !helperblock.find(rm => (rm.UserId === ar.TargetUserId && ar.UserId === rm.TargetUserId) ));
    for(let sp in fav_SP){
      const Prov_info = await this.bookServiceRepository.getProviderById(fav_SP[sp].TargetUserId);
      if(Prov_info && Prov_info.ZipCode === zipCode ){
        fav_Provider_Detail.push({
          ServiceProviderId:Prov_info.UserId,
          ServiceProviderName: Prov_info.FirstName!+" "+Prov_info.LastName,
          ProfilePicture: Prov_info.UserProfilePicture
        })
      }
    }
    return fav_Provider_Detail;
  }

  public async ValidateWithToday_Date(date: string):Promise<boolean> {
    const Req_Date = new Date(date.split("-").reverse().join("-"));
    const Today_Date = new Date(moment(new Date()).format("YYYY-MM-DD"));
    if (Req_Date > Today_Date) {
      return true;
    } else {
      return false;
    }
  };

  public createTemp(userEmail:string): typeof data{
    const data = {
        from: 'noreply_helperland@gmail.com',
        to: userEmail,
        subject: 'New Service Available',
        html: `
            <h1>New service is available that matches your pincode, login and accept.</h1>
            `
    }
    return data;
  }

  public DirectAssign(userEmail:string, srId:number): typeof data{
    const data = {
        from: 'no_reply_helperland',
        to: userEmail,
        subject: 'Service Assigned Directly',
        html: `
            <h1>A service request of ${srId} is directly assigned to you.</h1>
            `
    }
    return data;
  }

  public async getBlockedCustomerofProvider(userId:number, Providers:User[]):Promise<User[]>
  {
    const ProviderIds:number[] = [];
    for(let hp in Providers){
      ProviderIds.push(Providers[hp].UserId);
    }
    const blockedCustomer  = await this.bookServiceRepository.getBlockedCustomerofProvider(userId, ProviderIds);
    let req_providers = Providers.filter((sr) =>{return !blockedCustomer.find((rm) => {return (rm.UserId === sr.UserId)}
        )} 
      );
    return req_providers;
  }

  public SendEmailBasedOnHasPets(user:User[], body:any){
    let Send =[];
    if(body.HasPets === true){
      for (let x in user) {if(user[x].WorksWithPets === true)Send.push(user[x].Email!);}
    }else{for (let x in user) {Send.push(user[x].Email!);}
    }return Send;
  }

  public Fetchout_Blocked_Provider(user:User[], blockedProvider:FavoriteAndBlocked[]):User[]{
    const users = user.filter((item) =>{
      return blockedProvider.every((x) => {
        return x.TargetUserId !== item.UserId;
      });
    });
    return users;
  }

  public getTotalCost(ExtraService: number[], SubTotal: number): number {
    const TotalCost =  SubTotal+(ExtraService.length * 9);
    return TotalCost;
  }


  public getSubTotal(serviceHourlyRate: number, serviceHour: number): number {
    const subTotal = (serviceHour*serviceHourlyRate) ;
    return subTotal;
  }

  public async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.bookServiceRepository.getUserByEmail(userEmail);
  }
  
  

  public async createServiceRequest(serviceRequest: {[key: number | string]: ServiceRequest;}): Promise<ServiceRequest> {
    return this.bookServiceRepository.createServiceRequest(serviceRequest);
  }

  public async createServiceRequestWithAddress(serviceRequest: {[key: number | string]: ServiceRequest;}): Promise<ServiceRequest> {
    return this.bookServiceRepository.createServiceRequestWithAddress(serviceRequest);
  }

}
