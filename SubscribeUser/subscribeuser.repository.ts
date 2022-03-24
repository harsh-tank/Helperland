import {db} from "../models/index";
import {SubscribeUser} from "../models/subscribeuser";

export class SubscribeUserRepository{

    public async createSubscribeUser(subscribeUser: {[key: number|string]:SubscribeUser}): Promise<SubscribeUser>{
        return db.SubscribeUser.create(subscribeUser);
    }

    public async getSubscribeUser(): Promise<SubscribeUser[]> {
        return db.SubscribeUser.findAll();
    }

    public async getSubscribeUserById(userId:number): Promise<SubscribeUser |null> {
        return db.SubscribeUser.findOne({where: {id: userId}});    
    }

    public async getSubscribeUserByEmail(userEmail:string): Promise<SubscribeUser |null> {
        return db.SubscribeUser.findOne({where: {Email: userEmail}});    
    }

    public async updateSubscribeUser(IsConfirmedSubscriber:boolean, Email: string): Promise<[number, SubscribeUser[]]>{
        return db.SubscribeUser.update({IsConfirmedSubscriber:IsConfirmedSubscriber}, {where: {Email: Email}});
    }


}