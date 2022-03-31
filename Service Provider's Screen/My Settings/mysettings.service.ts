import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { Provider_Detail } from "./details";
import { MySettingsRepository } from "./mysettings.repository";

export class MySettingsService {
    public constructor(private readonly mySettingsRepository: MySettingsRepository){
      this.mySettingsRepository = mySettingsRepository;
    };

    public async get_User_Detail_ById(userId:number):Promise<Object|null>{
        let Print_data:Object = {}
        const result = await this.mySettingsRepository.get_User_Detail_ById(userId);
        const add = await this.mySettingsRepository.get_User_Add_ById(userId);
        if(result){
            Print_data = {
            Status:result.Status,
            BasicDetails:{FirstName:result.FirstName,LastName:result.LastName,
              EmailAddress:result.Email,PhoneNumber: result.Mobile,
              DateOfBirth:result.DateOfBirth,Nationality:result.NationalityId,
              Gender:result.Gender,ProfilePicture:result.UserProfilePicture,},
            Address: {StreetName: add?.AddressLine1,HouseNumber: add?.AddressLine2,
              PostalCode: add?.PostalCode,City: add?.City}
            }
        }
        return Print_data
      }

      public async get_Provider_Add_ById(ProviderId:number):Promise<UserAddress| null>{
        return this.mySettingsRepository.get_Provider_Add_ById(ProviderId);
      }

      public FormatDate(dateSt:any){
        const Format_St = dateSt.toString().split('-').reverse().join('-');
        const Valid_date = new Date(Format_St);
        return Valid_date;
    }

      public async create_Add(add_Id:number, user:Provider_Detail){
        return this.mySettingsRepository.create_Add(add_Id, user);
      }

      public async update_User_Add(add_Id:number, user:Provider_Detail){
        return this.mySettingsRepository.update_User_Add(add_Id, user);
      }

      public async get_User_ById(us_Id:string):Promise<User | null>{
        return this.mySettingsRepository.get_User_ById(+us_Id);
      }

      public async change_Pass(us_Id:string, pass:string):Promise<[number,User[]]>{
        return this.mySettingsRepository.change_Pass(+us_Id, pass);
      }

      public async update_User_DetailById(us_Id:string, user:Provider_Detail):Promise<[number,User[]]>{
        if(user.Gender === "Male"){user.GenderId = 1;}else if(user.Gender === "Female"){user.GenderId = 2;}
        else{user.GenderId = 3;}
        return this.mySettingsRepository.update_User_DetailById(+us_Id, user);
      }
}