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
exports.BookService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BookService {
    constructor(bookServiceRepository) {
        this.bookServiceRepository = bookServiceRepository;
        this.bookServiceRepository = bookServiceRepository;
    }
    createUserAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createUserAddress(userAddress);
        });
    }
    createFavoriteAndBlocked(favoriteandblocked) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createFavoriteAndBlocked(favoriteandblocked);
        });
    }
    getUserAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getUserAddress(userId);
        });
    }
    getFavoriteAndBlocked(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getFavoriteAndBlocked(userId);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getUserById(userId);
        });
    }
    getAllProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getAllProvider();
        });
    }
    getProviderByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getProviderByZipcode(zipCode);
        });
    }
    createToken(userEmail, ZipCode) {
        const token = jsonwebtoken_1.default.sign({ userEmail, ZipCode }, process.env.SECRET, {
            expiresIn: "1h",
        });
        return token;
    }
    getTargetUser(user) {
        let favoriteprovider = [];
        for (let us in user) {
            if (user[us].IsFavorite === true && user[us].IsBlocked === false) {
                favoriteprovider.push(user[us].TargetUserId);
            }
        }
        return favoriteprovider;
    }
    createTemp(userEmail) {
        const data = {
            from: 'noreply_helperland@gmail.com',
            to: userEmail,
            subject: 'New Service Available',
            html: `
            <h1>New service is available that matches your pincode, login and accept.</h1>
            `
        };
        return data;
    }
    getTotalCost(ExtraService, SubTotal) {
        const TotalCost = SubTotal + (ExtraService.length * 9);
        return TotalCost;
    }
    getSubTotal(serviceHourlyRate, serviceHour) {
        const subTotal = (serviceHour * serviceHourlyRate);
        return subTotal;
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getUserByEmail(userEmail);
        });
    }
    createServiceRequest(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createServiceRequest(serviceRequest);
        });
    }
    createServiceRequestWithAddress(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createServiceRequestWithAddress(serviceRequest);
        });
    }
}
exports.BookService = BookService;
