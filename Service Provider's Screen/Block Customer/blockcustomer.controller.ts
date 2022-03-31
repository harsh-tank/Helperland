import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { BlockCustomerRepository } from "./blockcustomer.repository";
import { BlockCustomerService } from "./blockcustomer.service";
import mailgun from "mailgun-js";
import moment from "moment";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class BlockCustomerController {
    public constructor(private readonly blockCustomerService: BlockCustomerService) {
        this.blockCustomerService = blockCustomerService;
      }

    public Cust_BlockList:RequestHandler = async(req, res, next):Promise<Response|void> => {
        if (req.body.userTypeId === 3 && req.body.userId) {
          req.body.TargetUserId = req.params.userId;
          if(req.body.IsBlocked){const inCustList = await this.blockCustomerService.IsCustProviderRelated(req.body.userId, req.params.userId);
            if(inCustList){
              return this.blockCustomerService.getBlockedCustomer(req.body.userId,req.params.userId)
            .then(block_Cust => {
              if(block_Cust && block_Cust.IsBlocked){
                return res.status(201).json({message:'Customer is already Blocked'})
              }else if(block_Cust && block_Cust.IsBlocked === false){
                return this.blockCustomerService.updateBlockedCustofSP(req.body.userId, req.params.userId)
                .then(up_Cust => {
                  if(up_Cust[0] === 1){
                    return res.status(200).json({message:'Customer is Blocked Now'});
                  }else{
                    return res.status(422).json({message:'error While blocking'});
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({error: error});
                })
              }else{
                req.body.UserId = req.body.userId;
                req.body.IsFavorite = false;
                return this.blockCustomerService.createBlockUnblockCust(req.body)
                .then(result => {
                  if(result){
                    return res.status(200).json(result);
                  }else{
                    return res.status(404).json({message:'error while creating data'});
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({error: error});
                });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({error: error});
            });
            }else{
              return res.status(400).json({message:'Provider and Customers Havenot Worked Together'});
            }
          }else{
            next();
          }
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      };

    public getCompletedSRofProvider:RequestHandler = async(req, res):Promise<Response> => {
        if (req.body.userTypeId === 3 && req.body.userId) {
          const cust = await this.blockCustomerService.getCompletedSRofProvider(req.body.userId)!;
          if(cust){if(cust.length>0){
              return res.status(200).json(cust);
            }else{
              return res.status(401).json({ message: "No customer found" });
            }
          }else{
            return res.status(404).json({ message: "No customer found" });
          }
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      }; 

    public Cust_UnBlockList:RequestHandler = async(req, res, next):Promise<Response> => {
        if(req.body.IsBlocked === false){
          return this.blockCustomerService.getBlockedCustomer(req.body.userId,req.params.userId)
          .then(result => {
            if(result && result.IsBlocked){
              return this.blockCustomerService.updateUnBlockedCustofProvider(req.body.userId, req.params.userId)
              .then(up_Cust => {
                if(up_Cust[0] === 1){
                  return res.status(200).json({message:'customer is unblocked successfully'});
                }else{
                  return res.status(422).json({message:'error while unblocking'});
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({error: error});
              })
              
            }else if(result && result.IsBlocked === false){
              return res.status(201).json({message:'customer is already unblocked'})
            }else{
              return res.status(404).json({message:'No Customer Available to Unblock'});
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({error: error});
          });
        }else{return res.status(400).json({message:'Invalid Input'});}
    }; 
}