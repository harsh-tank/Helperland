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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class ForgotPasswordService {
    constructor(forgotpasswordRepository) {
        this.forgotpasswordRepository = forgotpasswordRepository;
        this.forgotpasswordRepository = forgotpasswordRepository;
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forgotpasswordRepository.getUserByEmail(userEmail);
        });
    }
    createData(userEmail, link) {
        const temp = {
            from: 'support_helperland@gmail.com',
            to: userEmail,
            subject: 'Reset Password link',
            html: `<h2>Please click here to reset your password</h2>
              <a href="${process.env.Company_URL}/reset/${link}">Please click here to reset your password</a>`
        };
        return temp;
    }
    createToken(userEmail) {
        const token = jsonwebtoken_1.default.sign({ userEmail }, process.env.FORGOT_PASSWORD, { expiresIn: '1h' });
        return token;
    }
    updateUser(userPassword, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forgotpasswordRepository.updateUser(userPassword, userEmail);
        });
    }
}
exports.ForgotPasswordService = ForgotPasswordService;
