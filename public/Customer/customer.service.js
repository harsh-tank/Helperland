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
exports.CustomerService = void 0;
class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.customerRepository = customerRepository;
    }
    createCustomer(users) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerRepository.createCustomer(users);
        });
    }
    getCustomerByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerRepository.getCustomerByEmail(userEmail);
        });
    }
    createData(userEmail) {
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'SignUp Confirmation',
            html: `<h2>Your Account has been created as Customer</h2>`
        };
        return data;
    }
    update_Customer(Is_Registered, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerRepository.update_Customer(Is_Registered, userEmail);
        });
    }
}
exports.CustomerService = CustomerService;
