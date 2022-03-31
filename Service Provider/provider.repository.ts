import {db} from "../models/index"
import {User} from "../models/user"

export class ProviderRepository{

    public async createProvider(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }
    public async getProviderByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }
    public async update_Provider(Is_Registered:boolean, helperEmail: string): Promise<[number, User[]]>{
        return db.User.update({IsRegisteredUser:Is_Registered}, {where: {Email: helperEmail}});
    }
}