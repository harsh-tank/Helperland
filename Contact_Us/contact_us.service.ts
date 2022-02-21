import { Contact_Us } from "../models/contact_us";
import { Contact_UsRepository } from "./contact_us.repository";
import { User } from "../models/user"

export class Contact_UsService {
    public constructor(private readonly contact_usRepository: Contact_UsRepository) {
        this.contact_usRepository = contact_usRepository;
    }

    public async getContact_UsById(contact_usId: number): Promise<Contact_Us | null> {
        return this.contact_usRepository.getContact_UsById(contact_usId);
    }

    public async getContact_Us(): Promise<Contact_Us[]> {
        return this.contact_usRepository.getContact_Us();
    }

    public async getUserByEmail(userEmail:string): Promise<User |null> {
        return this.contact_usRepository.getUserByEmail(userEmail);
    }

    public async createContact_Us(users:{[key: number|string]:Contact_Us}): Promise<Contact_Us> {
        return this.contact_usRepository.createContact_Us(users);
    }

    public async updateContact_Us(users: Contact_Us, contact_usId: number): Promise<[number, Contact_Us[]]> {
        return this.contact_usRepository.updateContact_Us(users, contact_usId);
    }

    public async deleteContact_Us(contact_usId: number): Promise<number> {
        return this.contact_usRepository.deleteContact_Us(contact_usId);
    }
}