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
const moment_1 = __importDefault(require("moment"));
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
    getProviderById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getProviderById(userId);
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
    getAllBlockedProviderofUser(userId, Providers) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProviderIds = [];
            for (let us in Providers) {
                ProviderIds.push(Providers[us].UserId);
            }
            //console.log(userId)
            //console.log(ProviderIds)
            return this.bookServiceRepository.getAllBlockedProviderofUser(userId, ProviderIds);
        });
    }
    createToken(userEmail, ZipCode) {
        const token = jsonwebtoken_1.default.sign({ userEmail, ZipCode }, process.env.SECRET, {
            expiresIn: "1h",
        });
        return token;
    }
    getRequiredUser(user, zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let ProviderId = [];
            let fav_Provider_Detail = [];
            for (let x in user) {
                ProviderId.push(user[x].TargetUserId);
            }
            const helperblock = yield this.bookServiceRepository.getAllBlockCustOfProvider(ProviderId);
            const fav_SP = user.filter(ar => !helperblock.find(rm => (rm.UserId === ar.TargetUserId && ar.UserId === rm.TargetUserId)));
            for (let sp in fav_SP) {
                const Prov_info = yield this.bookServiceRepository.getProviderById(fav_SP[sp].TargetUserId);
                if (Prov_info && Prov_info.ZipCode === zipCode) {
                    fav_Provider_Detail.push({
                        ServiceProviderId: Prov_info.UserId,
                        ServiceProviderName: Prov_info.FirstName + " " + Prov_info.LastName,
                        ProfilePicture: Prov_info.UserProfilePicture
                    });
                }
            }
            return fav_Provider_Detail;
        });
    }
    ValidateWithToday_Date(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const Req_Date = new Date(date.split("-").reverse().join("-"));
            const Today_Date = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
            if (Req_Date > Today_Date) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    ;
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
    DirectAssign(userEmail, srId) {
        const data = {
            from: 'no_reply_helperland',
            to: userEmail,
            subject: 'Service Assigned Directly',
            html: `
            <h1>A service request of ${srId} is directly assigned to you.</h1>
            `
        };
        return data;
    }
    getBlockedCustomerofProvider(userId, Providers) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Providers);
            const ProviderIds = [];
            for (let hp in Providers) {
                ProviderIds.push(Providers[hp].UserId);
            }
            //console.log(userId);
            //console.log(ProviderIds);
            const blockedCustomer = yield this.bookServiceRepository.getBlockedCustomerofProvider(userId, ProviderIds);
            console.log(blockedCustomer);
            let req_providers = Providers.filter((sr) => {
                return !blockedCustomer.find((rm) => { return (rm.UserId === sr.UserId); });
            });
            //console.log(req_providers);
            return req_providers;
        });
    }
    SendEmailBasedOnHasPets(user, body) {
        let Send = [];
        if (body.HasPets === true) {
            for (let x in user) {
                if (user[x].WorksWithPets === true)
                    Send.push(user[x].Email);
            }
        }
        else {
            for (let x in user) {
                Send.push(user[x].Email);
            }
        }
        return Send;
    }
    Fetchout_Blocked_Provider(user, blockedProvider) {
        //console.log(user);
        console.log(blockedProvider);
        for (let x in blockedProvider) {
            console.log(blockedProvider[x].TargetUserId);
        }
        // let unblockedSP:User[]=[];
        // for(let u in user)
        // {
        //   for(let b in blockedProvider)
        //   {
        //     if(blockedProvider[b].TargetUserId===user[u].UserId)
        //     {
        //       continue;
        //     }
        //     else unblockedSP.push(user[u]);
        //   }
        // }
        const users = user.filter((item) => {
            return blockedProvider.every((x) => {
                return x.TargetUserId != item.UserId;
            });
        });
        //console.log()
        console.log(users);
        return users;
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
