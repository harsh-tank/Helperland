import { SubscribeUser } from "../models/subscribeuser";
import { SubscribeUserRepository } from "./subscribeuser.repository";

export class SubscribeUserService{
    public constructor(private readonly subscribeUserRepository: SubscribeUserRepository) {
        this.subscribeUserRepository = subscribeUserRepository;
    }

    public async createSubscribeUser(subscribeUser: {[key: number|string]:SubscribeUser}): Promise<SubscribeUser>{
        return this.subscribeUserRepository.createSubscribeUser(subscribeUser);
    }

    public async getSubscribeUser(): Promise<SubscribeUser[]> {
        return this.subscribeUserRepository.getSubscribeUser();
    }

    public async getSubscribeUserById(subUserId:number): Promise<SubscribeUser |null> {
        return this.subscribeUserRepository.getSubscribeUserById(subUserId);    
    }

    public async getSubscribeUserByEmail(subUserEmail:string): Promise<SubscribeUser |null> {
        return this.subscribeUserRepository.getSubscribeUserByEmail(subUserEmail);    
    }

    public createData(userEmail:string): typeof data{
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'Newsletter Subscription Email',
            html: `<h2>Hello User,Now you will receive Emails from helperland</h2>`
        }
        return data;
    }


    public createDataForAll(userEmail:string): typeof data{
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'Newsletter Subscription Email from Helperland',
            html: `
                <h1>Hello , you will now receive necessary emails from helperland </h1>
                `
        }
        return data;
    }

      public async updateSubscribeUser(IsConfirmedSubscriber:boolean, Email: string): Promise<[number, SubscribeUser[]]>{
        return this.subscribeUserRepository.updateSubscribeUser(IsConfirmedSubscriber,Email);
    }
}