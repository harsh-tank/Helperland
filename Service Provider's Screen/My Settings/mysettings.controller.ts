import { Request, Response, RequestHandler } from "express";
import { MySettingsService } from "./mysettings.service";
import { db } from "../../models/index";
import bcrypt from "bcrypt";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import mailgun from "mailgun-js";
import { Provider_Detail } from "./details";
import { MySettingsRepository } from "./mysettings.repository";

require("dotenv").config();
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class MySettingsController {
    public constructor(private readonly mySettingsService: MySettingsService) {
      this.mySettingsService = mySettingsService;
    }

    public update_User_DetailById:RequestHandler = async(req, res, next):Promise<Response|void> => {
        if(req.body.userId && req.body.userTypeId === 3){
          req.body.DateOfBirth = this.mySettingsService.FormatDate(req.body.DateOfBirth);
          return this.mySettingsService.update_User_DetailById(req.body.userId, req.body)
          .then(upd_User => {if(upd_User){next();}
          else{return res.status(422).json({message:'error While updating'});}
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
        }else{return res.status(400).json({message:'Invalid Input'});}
      };
    

    public get_User_Detail_ById: RequestHandler = async (req,res): Promise<Response> => {
        const Us_Id = +req.body.userId;
        if (Us_Id && req.body.userTypeId === 3) {
          return this.mySettingsService.get_User_Detail_ById(Us_Id)
            .then((user_Info) => {
              if(user_Info){return res.status(200).json(user_Info);}
              else{return res.status(404).json({message:'Info Not Found'});}
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        }
        else{
          return res.status(400).json({message:'Invalid Input'});
        }
      };

      public change_Pass:RequestHandler = async(req, res):Promise<Response> => {
        if(req.body.userId && req.body.userTypeId === 3){
          return this.mySettingsService.get_User_ById(req.body.userId)
          .then(async result => {
            if(result){
              const confirm = await bcrypt.compare(req.body.Old_Password, result.Password!);
              if(confirm){
                if(req.body.New_Password === req.body.Confirm_Password){
                  const hashedPassword = await bcrypt.hash(req.body.New_Password, 10);
                  return this.mySettingsService.change_Pass(req.body.userId, hashedPassword)
                  .then(upd_Pass => {
                    if(upd_Pass){
                      if(upd_Pass[0] ===1){return res.status(200).json({message:'password is changed now'}); }
                      else{return res.status(404).json({message:'error while changing pass'});}
                    }
                    else{
                      return res.status(404).json({message:'error while changing pass'}); 
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  })
                }else{
                  return res.status(400).json({message:'New & Confirm Password should match'});
                }
              }else{
                return res.status(400).json({message:'Wrong old pass'});
              }
            }else{
              return res.status(404).json({message:'No User Found'});
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          })
        }else{
          return res.status(400).json({message:'Invalid Input'});
        }
      };
    
      public Create_Or_Upd_Add:RequestHandler = async(req, res):Promise<Response> => {
        const Us_Id = +req.body.userId; 
        if(Us_Id && req.body.userTypeId === 3){
          return this.mySettingsService.get_Provider_Add_ById(Us_Id)
          .then(user_Add => {
            if(user_Add){
              return this.mySettingsService.update_User_Add(user_Add.AddressId,req.body)
              .then(upd_Add => {
                if(upd_Add){
                  return res.status(200).json({message:'Address Updated Successfully'});
                }else{
                  return res.status(422).json({message:'error while updating'});
                }
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
            }else{
              return this.mySettingsService.create_Add(Us_Id, req.body)
              .then(address => {
                if(address){
                  return res.status(200).json(address);
                }else{
                  return res.status(500).json({message:'error while creating'});
                }
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
          })
        }else{
          return res.status(400).json({message:'Invalid Input'});
        }
      };
}






