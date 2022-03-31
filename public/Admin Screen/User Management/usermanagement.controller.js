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
exports.UserManagementController = void 0;
require("dotenv").config();
class UserManagementController {
    constructor(userManagementService) {
        this.userManagementService = userManagementService;
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 2 && req.body.userId) {
                return this.userManagementService.getAllUsers()
                    .then((result) => {
                    if (result && result.length > 0) {
                        return res.status(200).json(result);
                    }
                    else {
                        return res.status(404).json({ message: "No user Found" });
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
        this.changeUserStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 2) {
                if (req.body.Active) {
                    return this.userManagementService.make_user_active(req.params.userId)
                        .then(result => {
                        if (result !== null) {
                            if (result[0] === 1) {
                                return res.status(200).json({ message: "User is Activated " });
                            }
                            else {
                                return res.status(400).json({ message: "error while activating user" });
                            }
                        }
                        else {
                            return res.status(404).json({ message: "User Already Active or Not Found" });
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return this.userManagementService.make_user_inactive(req.params.userId)
                        .then(inActive => {
                        if (inActive !== null) {
                            if (inActive[0] === 1) {
                                return res.status(200).json({ message: "user is UnActived" });
                            }
                            else {
                                return res.status(422).json({ message: "error While inActivating user" });
                            }
                        }
                        else {
                            return res.status(404).json({ message: "User Already InActive or Not Found" });
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.userManagementService = userManagementService;
    }
}
exports.UserManagementController = UserManagementController;
