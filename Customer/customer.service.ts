import { User } from "../models/user";
import { CustomerRepository } from "./customer.repository";

export class CustomerService{
    public constructor(private readonly customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async createCustomer(users:{[key: number|string]:User}): Promise<User> {
        return this.customerRepository.createCustomer(users);
    }

    public async getCustomerByEmail(userEmail:string): Promise<User |null> {
        return this.customerRepository.getCustomerByEmail(userEmail);
    }

    
    public createData(userEmail:string):typeof data{
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'SignUp Confirmation',
            html: `<h2>Your Account has been created as Customer</h2>`
         }
        return data;
    }

    public async update_Customer(Is_Registered:boolean, userEmail: string): Promise<[number, User[]]>{
        return this.customerRepository.update_Customer(Is_Registered,userEmail);
    }
}