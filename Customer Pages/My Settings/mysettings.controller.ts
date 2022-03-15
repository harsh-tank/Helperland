import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import mailgun from "mailgun-js";
import bcrypt from "bcrypt";
import { MySettingsService } from "./mysettings.service";

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

    public get_User_AddById:RequestHandler = async(req, res):Promise<Response> => {
        const UserId = +req.body.userId; 
        if(UserId && req.body.userTypeId === 4){
           return this.mySettingsService.get_User_AddById(UserId)
          .then(user_Add => {
            if(user_Add){
              return res.status(200).json(user_Add);
            }else{
              return res.status(404).json({message:'No address Available'});
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

      public get_User_AddByAdd_Id:RequestHandler = async(req, res):Promise<Response> => {
        const add_Id = +req.params.addressId; 
        if(add_Id && req.body.userTypeId === 4){
          return this.mySettingsService.get_User_AddByAdd_Id(add_Id,req.body.userId)
          .then(user_Add => {
            if(user_Add){
              return res.status(200).json(user_Add);
            }else{
              return res.status(404).json({message:'No address found'});
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
    
      public update_User_AddByAdd_Id:RequestHandler = async(req, res):Promise<Response> => {
        if(req.params.addressId && req.body.userTypeId === 4){
          req.body.Addressline1 = req.body.StreetName;
          req.body.Addressline2 = req.body.HouseNumber;
          return this.mySettingsService.update_User_AddByAdd_Id(req.params.addressId,req.body.userId, req.body)
          .then(up_Add => {
            if(up_Add){
              if(up_Add[0] === 1){
                return res.status(201).json({message:'Address is Updated'});
              }else{
                return res.status(422).json({message:'Error while updating'});
              }
            }else{
              return res.status(422).json({message:'Error while updating'});
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
    
      public get_User_DetailById: RequestHandler = async (req,res): Promise<Response> => {
        const U_Id = +req.body.userId;
        if (U_Id && req.body.userTypeId === 4) {
          return this.mySettingsService.get_User_DetailById(U_Id)
            .then((u_Detail) => {
              if(u_Detail){
                return res.status(200).json(u_Detail);
              }else{
                return res.status(404).json({message:'No User Found With Given ID'});
              }
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
    
      public update_User_DetailById:RequestHandler = async(req, res):Promise<Response> => {
        if(req.body.userId && req.body.userTypeId === 4){
          const UserId = +req.body.userId;
          req.body.DateOfBirth = this.mySettingsService.FormatDate(req.body.DateOfBirth);
          return this.mySettingsService.update_User_DetailById(UserId, req.body)
          .then(up_User => {
            if(up_User){
              return res.status(200).json(up_User);
            }else{
              return res.status(500).json({message:'Error while updating'});
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
        }else{
          return res.status(400).json({message:'Invalid Input'});
        }
      };
    
      public create_Add:RequestHandler = async(req, res):Promise<Response> => {
        req.body.IsDefault = false;
        req.body.IsDeleted = false;
        if(req.body.userId && req.body.userTypeId === 4){
          req.body.UserId = req.body.userId;
          req.body.Addressline1 = req.body.StreetName;
          req.body.Addressline2 = req.body.HouseNumber;
          req.body.Email = req.body.email;
          return this.mySettingsService.create_Add(req.body)
          .then(cre_Add => {
            if(cre_Add){
                return res.status(200).json({message:'address created successfully'});
            }else{
              return res.status(422).json({message:'error while creating address'});
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
    
      public delete_Add:RequestHandler = async(req, res):Promise<Response> => {
        if(req.params.addressId && req.body.userTypeId === 4 ){
          return this.mySettingsService.delete_Add(req.params.addressId, req.body.userId)
          .then(del_Add => {
            if(del_Add){
              if(del_Add[0] === 1){
                return res.status(200).json({message:'address is deleted'});
              }else{
                return res.status(404).json({message:'error while deleting'});
              }
            }else{
              return res.status(404).json({message:'error while deleting'});
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
        }else{
          return res.status(400).json({message:'Invalid Input'});
        }
      };
    
      public change_Pass:RequestHandler = async(req, res):Promise<Response> => {
        if(req.body.userId && req.body.userTypeId === 4){
          return this.mySettingsService.get_User_ById(req.body.userId)
          .then(async ex_us => {
            if(ex_us){
              const confirm = await bcrypt.compare(req.body.Old_Password, ex_us.Password!);
              if(confirm){
                if(req.body.New_Password === req.body.Confirm_Password){
                  const hashedPassword = await bcrypt.hash(req.body.New_Password, 10);
                  return this.mySettingsService.change_Pass(req.body.userId, hashedPassword)
                  .then(change_Pass => {
                    if(change_Pass){
                      if(change_Pass[0] ===1){
                        return res.status(200).json({message:'password is changed now'}); 
                      }else{
                        return res.status(404).json({message:'error while changing password'}); 
                      }
                    }else{
                      return res.status(404).json({message:'error while changing password'}); 
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  })
                }else{
                  return res.status(400).json({message:'New Password and Confirm Password should match'});
                }
              }else{
                return res.status(400).json({message:'Incorrect old password'});
              }
            }else{
              return res.status(404).json({message:'No user found'});
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

