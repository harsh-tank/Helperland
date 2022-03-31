import moment from "moment";
import { UserManagementRepository } from "./usermanagement.repository";
import { db } from "../../models/index";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { Print_data } from "./US_data";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Request, Response, RequestHandler } from "express";
import { UserManagementService } from "./usermanagement.service";
require("dotenv").config();

export class UserManagementController {
    public constructor(private readonly userManagementService: UserManagementService) {
      this.userManagementService = userManagementService;
    }

    public getAllUsers: RequestHandler = async (req,res): Promise<Response> => {
    if (req.body.userTypeId === 2 && req.body.userId) {
      return this.userManagementService.getAllUsers()
        .then((result) => {
          if (result && result.length > 0) {
            return res.status(200).json(result);
          } else {
            return res.status(404).json({ message: "No user Found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    } else {
      return res.status(401).json({ message: "unauthorised user" });
    }
  };

  public changeUserStatus: RequestHandler = async (req,res): Promise<Response> => 
  {
    if (req.body.userTypeId === 2) {
      if(req.body.Active){
        return  this.userManagementService.make_user_active(req.params.userId)
        .then(result => {
          if(result !== null){
            if(result[0] === 1){
              return res.status(200).json({ message: "User is Activated "});
            }else{
              return res.status(400).json({ message: "error while activating user"});
            }
          }else{
            return res.status(404).json({ message: "User Already Active or Not Found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
      }else{
        return  this.userManagementService.make_user_inactive(req.params.userId)
        .then(inActive => {
          if(inActive !== null){
            if(inActive[0] === 1){
              return res.status(200).json({ message: "user is UnActived"});
            }else{
              return res.status(422).json({ message: "error While inActivating user"});
            }
          }else{
            return res.status(404).json({ message: "User Already InActive or Not Found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };
}  