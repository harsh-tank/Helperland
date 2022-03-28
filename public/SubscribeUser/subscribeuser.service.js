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
exports.SubscribeUserService = void 0;
class SubscribeUserService {
    constructor(subscribeUserRepository) {
        this.subscribeUserRepository = subscribeUserRepository;
        this.subscribeUserRepository = subscribeUserRepository;
    }
    createSubscribeUser(subscribeUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserRepository.createSubscribeUser(subscribeUser);
        });
    }
    getSubscribeUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserRepository.getSubscribeUser();
        });
    }
    getSubscribeUserById(subUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserRepository.getSubscribeUserById(subUserId);
        });
    }
    getSubscribeUserByEmail(subUserEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserRepository.getSubscribeUserByEmail(subUserEmail);
        });
    }
    createData(userEmail) {
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'Newsletter Subscription Email',
            html: `<h2>Hello User,Now you will receive Emails from helperland</h2>`
        };
        return data;
    }
    createDataForAll(userEmail) {
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'Newsletter Subscription Email from Helperland',
            html: `
                <h1>Hello , you will now receive necessary emails from helperland </h1>
                `
        };
        return data;
    }
    updateSubscribeUser(IsConfirmedSubscriber, Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscribeUserRepository.updateSubscribeUser(IsConfirmedSubscriber, Email);
        });
    }
}
exports.SubscribeUserService = SubscribeUserService;
