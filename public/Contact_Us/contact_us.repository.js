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
exports.Contact_UsRepository = void 0;
const index_1 = require("../models/index");
class Contact_UsRepository {
    getContact_UsById(contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Contact_Us.findOne({ where: { Contact_UsId: contact_usId } });
        });
    }
    getContact_Us() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Contact_Us.findAll();
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: userEmail } });
        });
    }
    createContact_Us(users) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Contact_Us.create(users);
        });
    }
    updateContact_Us(users, contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Contact_Us.update(users, { where: { Contact_UsId: contact_usId } });
        });
    }
    deleteContact_Us(contact_usId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Contact_Us.destroy({ where: { Contact_UsId: contact_usId } });
        });
    }
}
exports.Contact_UsRepository = Contact_UsRepository;
