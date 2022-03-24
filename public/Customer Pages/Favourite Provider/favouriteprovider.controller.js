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
exports.FavoriteProviderController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: DOMAIN,
});
class FavoriteProviderController {
    constructor(favoriteProviderService) {
        this.favoriteProviderService = favoriteProviderService;
        this.create_Favor_Provider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const ProviderId = +req.params.helperId;
            console.log(ProviderId);
            const us_Id = +req.body.userId;
            //console.log(us_Id);
            if (req.body.userId && req.body.userTypeId === 4) {
                req.body.UserId = us_Id;
                req.body.TargetUserId = ProviderId;
                return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
                    .then((ser_Req) => {
                    const Provider_Ids = this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
                    console.log(Provider_Ids);
                    if (Provider_Ids.length > 0) {
                        let Prov_List = false;
                        for (let x in Provider_Ids) {
                            //console.log(Provider_Ids[x]===ProviderId)
                            console.log(ProviderId);
                            console.log(Provider_Ids[x]);
                            if (Provider_Ids[x] == ProviderId) {
                                Prov_List = true;
                                break;
                            }
                        }
                        console.log(Prov_List);
                        //const Prov_List = Provider_Ids.includes(parseInt(req.params.helperId));
                        if (Prov_List) {
                            if (req.body.IsFavorite) {
                                return this.favoriteProviderService.get_Fav_Provider(us_Id, ProviderId).then((favor) => {
                                    if (favor) {
                                        if (favor.IsFavorite) {
                                            return res.status(409).json({ message: "SP is already marked as Favourite", });
                                        }
                                        else {
                                            return this.favoriteProviderService.update_Fav_Provider(req.body)
                                                .then((favor) => {
                                                if (favor.length > 0) {
                                                    res.status(201).json({ message: "Favourite SP Added", });
                                                }
                                                else {
                                                    res.status(502).json({ message: "error while Adding favorite SP", });
                                                }
                                            })
                                                .catch((error) => {
                                                console.log(error);
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        req.body.IsBlocked = false;
                                        return this.favoriteProviderService.create_Fav_Provider(req.body)
                                            .then((favor_Prov) => {
                                            if (favor_Prov) {
                                                return res.status(200).json({ message: "favorite SP is created now", });
                                            }
                                            return res.status(502).json({ message: "error while adding favorite SP", });
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else if (req.body.IsFavorite === false) {
                                next();
                            }
                            else {
                                return res.status(404).json({ message: "No Data Found" });
                            }
                        }
                        else {
                            return res.status(404).json({
                                message: "SP didnot Worked With You",
                            });
                        }
                    }
                    else {
                        return res.status(404).json({
                            message: "No SP worked with You",
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.get_Provider_Cust_Relation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 4) {
                return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
                    .then((ser_Req) => {
                    const Pro_Id = this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
                    if (Pro_Id.length > 0) {
                        return this.favoriteProviderService.get_Provider_Cust_Relation(Pro_Id)
                            .then((Provider) => {
                            if (Provider && Provider.length > 0) {
                                return res.status(200).json(Provider);
                            }
                            else {
                                return res.status(404).json({ message: "No SP Worked With You Previously", });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(404).json({
                            message: "No SP Worked With You Previously",
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.Remove_Fav_Provider = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
                .then((result) => {
                if (result) {
                    if (result.IsFavorite) {
                        return this.favoriteProviderService.update_Fav_Provider(req.body)
                            .then(favour => {
                            if (favour) {
                                res.status(201).json({ message: "favorite SP updated" });
                            }
                            else {
                                res.status(502).json({ message: "error while updating favorite SP", });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else if (result.IsFavorite === false) {
                        return res.status(400).json({ message: 'SP is already Marked Favourite' });
                    }
                    else {
                        return res.status(404).json({ message: "No SP in Favorite List" });
                    }
                }
                else {
                    return res.status(404).json({ message: "No SP in Favorite List" });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.Removing_SP_From_Blocked_List = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
                .then((result) => {
                if (result) {
                    if (result.IsBlocked) {
                        return this.favoriteProviderService.update_Block_Provider(req.body)
                            .then(block_Result => {
                            if (block_Result.length > 0) {
                                res.status(200).json({ message: "SP is now unblocked" });
                            }
                            else {
                                res.status(502).json({ message: "error while Unblocking", });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else if (result.IsBlocked === false) {
                        return res.status(401).json({ message: 'SP is already UnBlocked' });
                    }
                    else {
                        return res
                            .status(404)
                            .json({ message: "No SP is Block List" });
                    }
                }
                else {
                    return res
                        .status(404)
                        .json({ message: "No SP in Favourite List" });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.block_Provier = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 4) {
                req.body.UserId = req.body.userId;
                req.body.TargetUserId = req.params.helperId;
                return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
                    .then((ser_Req) => {
                    const Provider_Ids = this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
                    if (Provider_Ids.length > 0) {
                        //const Prov_list = Provider_Ids.includes(+req.params.helperId);
                        let Prov_List = false;
                        for (let x in Provider_Ids) {
                            //console.log(Provider_Ids[x]===ProviderId)
                            //console.log(ProviderId);
                            //console.log(Provider_Ids[x]);
                            if (Provider_Ids[x] == +req.params.helperId) {
                                Prov_List = true;
                                break;
                            }
                        }
                        console.log(Prov_List);
                        if (Prov_List) {
                            if (req.body.IsBlocked) {
                                return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
                                    .then((SP_Prov) => {
                                    if (SP_Prov) {
                                        if (SP_Prov.IsBlocked) {
                                            return res.status(409).json({ message: "SP is already marked as Blocked" });
                                        }
                                        else {
                                            return this.favoriteProviderService.update_Block_Provider(req.body)
                                                .then(upd_Pro => {
                                                if (upd_Pro.length > 0) {
                                                    res.status(201).json({ message: "SP is blocked now", });
                                                }
                                                else {
                                                    res.status(500).json({ message: "error while blocking SP", });
                                                }
                                            })
                                                .catch((error) => {
                                                console.log(error);
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        req.body.IsFavorite = false;
                                        return this.favoriteProviderService.create_Fav_Provider(req.body)
                                            .then((block_Prov) => {
                                            if (block_Prov) {
                                                return res.status(200).json({ message: "blocked helper created successfully", });
                                            }
                                            return res.status(502).json({
                                                message: "error in creating blocked helper",
                                            });
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else if (req.body.IsBlocked === false) {
                                next();
                            }
                            else {
                                return res.status(404).json({ message: "No Data found" });
                            }
                        }
                        else {
                            return res.status(404).json({ message: "this service provider has not worked with customer in past", });
                        }
                    }
                    else {
                        return res.status(404).json({ message: "no service provider found worked with customer in past", });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.favoriteProviderService = favoriteProviderService;
    }
}
exports.FavoriteProviderController = FavoriteProviderController;
