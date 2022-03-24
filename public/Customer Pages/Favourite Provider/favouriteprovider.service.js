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
exports.FavoriteProviderService = void 0;
class FavoriteProviderService {
    constructor(favoriteProviderRepository) {
        this.favoriteProviderRepository = favoriteProviderRepository;
        this.favoriteProviderRepository = favoriteProviderRepository;
    }
    ;
    get_ProviderId_Cust_Relation(sR) {
        const ProviderId = [];
        for (let x in sR) {
            if (sR[x].Status === 3 && sR[x].ServiceProviderId != null) {
                ProviderId.push(sR[x].ServiceProviderId);
            }
        }
        return ProviderId;
    }
    getAllSRByUserId(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.getAllSRByUserId(us_Id);
        });
    }
    get_Provider_Cust_Relation(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.get_Provider_Cust_Relation(us_Id);
        });
    }
    update_Block_Provider(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.update_Block_Provider(block);
        });
    }
    create_Fav_Provider(fav) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.create_Fav_Provider(fav);
        });
    }
    update_Fav_Provider(fav) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.update_Fav_Provider(fav);
        });
    }
    get_Fav_Provider(us_Id, ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderRepository.get_Fav_Provider(us_Id, ProviderId);
        });
    }
}
exports.FavoriteProviderService = FavoriteProviderService;
