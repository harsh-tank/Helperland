import {db} from "../models/index"
import {User} from "../models/user"

export class LoginRepository{

    public async getUserByEmail(userEmail:string):Promise<User|null>{
        return db.User.findOne({where:{Email:userEmail}});
    }
}