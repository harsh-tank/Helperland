import jwt from "jsonwebtoken";
import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookservice.repository";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { ServiceRequestAddress } from "../models/servicerequestaddress"

export class BookService {
  public constructor(
    private readonly bookServiceRepository: BookServiceRepository
  ) {
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

  public async getUserById(userId: number[]): Promise<User[]> {
    return this.bookServiceRepository.getUserById(userId);
}

  public async getAllProvider(): Promise<User[]> {
    return this.bookServiceRepository.getAllProvider();
  }

  public async getProviderByZipCode(zipCode:string): Promise<User[]> {
    return this.bookServiceRepository.getProviderByZipcode(zipCode);
  }


  public createToken(userEmail: string, ZipCode: string): string {
    const token = jwt.sign({ userEmail, ZipCode }, process.env.SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }

  public getTargetUser(user:FavoriteAndBlocked[]):number[]{
    let favoriteprovider = [];
    for(let us in user){
      if(user[us].IsFavorite===true && user[us].IsBlocked===false){
        favoriteprovider.push(user[us].TargetUserId);
      }
    }
    return favoriteprovider;
  }

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
