import {db} from "../models/index"
import {User} from "../models/user"


export class ForgotPasswordRepository{

    public async getUserByEmail(userEmail:string):Promise<User|null>{
        return db.User.findOne({where:{Email:userEmail}});
    }

    public async updateUser(userPassword:string, userEmail:string):Promise<[number, User[]]>{
        return db.User.update({Password:userPassword}, {where:{Email:userEmail}});
    }
}