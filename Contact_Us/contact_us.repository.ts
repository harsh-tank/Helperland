import  {db} from "../models/index";
import { Contact_Us } from "../models/contact_us";

export class Contact_UsRepository {
    public async getContact_UsById(contact_usId: number): Promise<Contact_Us | null> {
        return db.Contact_Us.findOne({ where: {id: contact_usId}});
    }
    public async getContact_Us(): Promise<Contact_Us[]> {
        return db.Contact_Us.findAll();
    }
    public async createContact_Us(users: {[key: number|string]:Contact_Us}): Promise<Contact_Us> {
        return db.Contact_Us.create(users);
    }
    public async updateContact_Us(users: Contact_Us, contact_usId: number): Promise<[number, Contact_Us[]]> {
        return db.Contact_Us.update(users, { where: {id: contact_usId}});
    }
    public async deleteContact_Us(contact_usId: number): Promise<number> {
        return db.Contact_Us.destroy({ where: {id: contact_usId}});  
    }
}