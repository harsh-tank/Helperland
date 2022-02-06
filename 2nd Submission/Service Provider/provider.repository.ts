import {db} from "../models/index"
import {User} from "../models/user"

export class ProviderRepository{

    public async createProvider(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }

    public async getProviderByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }

}