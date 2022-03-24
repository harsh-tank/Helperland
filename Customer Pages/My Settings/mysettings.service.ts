import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { UserAddress } from "../../models/useraddress";
import { MySettingsRepository } from "./mysettings.repository";

export class MySettingsService {

  public constructor(private readonly mySettingsRepository: MySettingsRepository) {
    this.mySettingsRepository = mySettingsRepository;
  };

  public async get_User_AddById(userId:number):Promise<UserAddress[]| null>{
    return this.mySettingsRepository.get_User_AddById(userId);
  }

  public async get_User_AddByAdd_Id(addressId:number, userId:string):Promise<UserAddress| null>{
    return this.mySettingsRepository.get_User_AddByAdd_Id(addressId,+userId);
  }

  public async update_User_AddByAdd_Id(addressId:string, userId:string, userAddress:UserAddress){
    return this.mySettingsRepository.update_User_AddByAdd_Id(+addressId, +userId, userAddress);
  }

  public async get_User_DetailById(userId:number):Promise<User | null>{
    return this.mySettingsRepository.get_User_DetailById(userId);
  }

  public async update_User_DetailById(userId:number, user:User):Promise<[number,User[]]>{
    return this.mySettingsRepository.update_User_DetailById(userId, user);
  }

  public async get_User_ById(userId:string):Promise<User | null>{
    return this.mySettingsRepository.get_User_ById(+userId);
  }

  public async create_Add(userAddress:{[key: number|string]:ServiceRequest}):Promise<UserAddress>{
    return this.mySettingsRepository.create_Add(userAddress);
  }

  public async delete_Add(addressId:string, userId:string){
    return this.mySettingsRepository.delete_Add(+addressId, +userId);
  }

  public FormatDate(dateStr:any){
    const St_Date = dateStr.toString().split('-').reverse().join('-');
    const D_Date = new Date(St_Date);
    return D_Date;
}

  public async change_Pass(userId:string, password:string):Promise<[number,User[]]>{
    return this.mySettingsRepository.change_Pass(+userId, password);
  }

}