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
exports.FavoriteProviderRepository = void 0;
const index_1 = require("../../models/index");
const sequelize_1 = require("sequelize");
class FavoriteProviderRepository {
    create_Fav_Provider(favorite) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.create(favorite);
        });
    }
    get_Provider_Cust_Relation(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: 3, UserId: { [sequelize_1.Op.or]: us_Id } },
                include: 'TargetUserId'
            });
        });
    }
    getAllSRByUserId(us_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { UserId: us_Id } });
        });
    }
    update_Block_Provider(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.update({ IsBlocked: block.IsBlocked }, { where: { UserId: block.UserId, TargetUserId: block.TargetUserId } });
        });
    }
    get_Fav_Provider(us_Id, Provider_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findOne({ where: { UserId: us_Id, TargetUserId: Provider_Id } });
        });
    }
    update_Fav_Provider(fav) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.update({ IsFavorite: fav.IsFavorite }, { where: { UserId: fav.UserId, TargetUserId: fav.TargetUserId } });
        });
    }
}
exports.FavoriteProviderRepository = FavoriteProviderRepository;
