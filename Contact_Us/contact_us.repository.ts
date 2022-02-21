import  {db} from "../models/index";
import { Contact_Us } from "../models/contact_us";
import { User } from '../models/user'

export class Contact_UsRepository {
    public async getContact_UsById(contact_usId: number): Promise<Contact_Us | null> {
        return db.Contact_Us.findOne({ where: {Contact_UsId: contact_usId}});
    }
    public async getContact_Us(): Promise<Contact_Us[]> {
        return db.Contact_Us.findAll();
    }
    public async getUserByEmail(userEmail:string): Promise<User |null> {
        return db.User.findOne({where: {Email: userEmail}});    
    }
    public async createContact_Us(users: {[key: number|string]:Contact_Us}): Promise<Contact_Us> {
        return db.Contact_Us.create(users);
    }
    public async updateContact_Us(users: Contact_Us, contact_usId: number): Promise<[number, Contact_Us[]]> {
        return db.Contact_Us.update(users, { where: {Contact_UsId: contact_usId}});
    }
    public async deleteContact_Us(contact_usId: number): Promise<number> {
        return db.Contact_Us.destroy({ where: {Contact_UsId: contact_usId}});  
    }
}