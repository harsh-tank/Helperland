import {db} from "../models/index"
import {User} from "../models/user"

export class CustomerRepository{

    public async createCustomer(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }
    public async getCustomerByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }
}