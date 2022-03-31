import {db} from "../models/index"
import {User} from "../models/user"

export class CustomerRepository{

    public async createCustomer(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }
    public async getCustomerByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }
    public async update_Customer(Is_Registered:boolean, userEmail: string): Promise<[number, User[]]>{
        return db.User.update({IsRegisteredUser:Is_Registered,IsActive:true}, {where: {Email: userEmail}});
    }
}