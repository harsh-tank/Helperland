import { User } from "../models/user";
import { ProviderRepository } from "./provider.repository";

export class ProviderService{
    public constructor(private readonly ProviderRepository: ProviderRepository) {
        this.ProviderRepository = ProviderRepository;
    }

    public async createProvider(users:{[key: number|string]:User}): Promise<User> {
        return this.ProviderRepository.createProvider(users);
    }

    public async getProviderByEmail(userEmail:string): Promise<User |null> {
        return this.ProviderRepository.getProviderByEmail(userEmail);
    }

    public createData(userEmail:string):typeof data{
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'SignUp Confirmation',
            html: `<h2>Your Account has been created as Service Provider</h2>`
        }
        return data;
    }
    public async update_Provider(Is_Registered:boolean, ProviderEmail: string): Promise<[number, User[]]>{
        return this.ProviderRepository.update_Provider(Is_Registered,ProviderEmail);
    }
}