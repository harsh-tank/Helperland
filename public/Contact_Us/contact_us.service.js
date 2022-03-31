"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact_UsService = void 0;
class Contact_UsService {
    constructor(contact_usRepository) {
        this.contact_usRepository = contact_usRepository;
        this.contact_usRepository = contact_usRepository;
    }
    getContact_UsById(contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.getContact_UsById(contact_usId);
        });
    }
    getContact_Us() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.getContact_Us();
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.getUserByEmail(userEmail);
        });
    }
    createContact_Us(users) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.createContact_Us(users);
        });
    }
    updateContact_Us(users, contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.updateContact_Us(users, contact_usId);
        });
    }
    deleteContact_Us(contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contact_usRepository.deleteContact_Us(contact_usId);
        });
    }
    Send_Email(ad_Email, Name, email, subject, mobile, message) {
        const temp = {
            from: 'no_reply_helperland@gmail.com',
            to: ad_Email,
            subject: 'New Contact_Us Notification',
            html: `
                <p>Name    : ${Name}</p>
                <p>Email   : ${email}</p>
                <p>Subject : ${subject}</p>
                <p>Mobile  : ${mobile}</p>
                <p>Message : ${message}</p>
                `
        };
        return temp;
    }
    ;
    admin_Emails() {
        return __awaiter(this, void 0, void 0, function* () {
            let ad_mails = [];
            const result = yield this.contact_usRepository.get_All_Admin();
            if (result && result.length > 0) {
                for (let ad in result) {
                    ad_mails.push(result[ad].Email);
                }
            }
            return ad_mails;
        });
    }
}
exports.Contact_UsService = Contact_UsService;
