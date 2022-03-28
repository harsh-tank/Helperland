import moment from "moment";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { upd_SR_data , Print_Req_Data , filter_features } from "./request_handle";
import { ServiceRequestsRepository } from "./servicerequests.repository";
import { Request, Response, RequestHandler } from "express";
import { ServiceRequestsService } from "./servicerequests.service";
import mailgun from "mailgun-js";
require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class ServiceRequestsController {
    public constructor(
      private readonly serviceRequestsService: ServiceRequestsService) {
      this.serviceRequestsService = serviceRequestsService;
    }

    public reschedule_SR:RequestHandler = async(req, res):Promise<Response> =>
    {
    const confirm = await this.serviceRequestsService.Same_Reschedule_check(req.body);
    if(confirm === false){
      const Valid = this.serviceRequestsService.ValidatedDate(req.body.ServiceStartDate);
        if (Valid) {
          return this.serviceRequestsService.reschedule_SR(req.body, req.body.userId)
          .then(async re_sr => {
            if(re_sr[0] === 1){
              const mail = await this.serviceRequestsService.User_SP_mail(req.body.serviceRequest);
              if(req.body.updatedAddress){
                  for (let x in mail) {
                    const data = this.serviceRequestsService.SendEmail_For_SR_upd(mail[x],req.body);
                    mg.messages().send(data, (error, body) => {
                      if (error) {
                        return res.json({ error: error.message });}});
                  }
              }else{
                for (let x in mail) {
                  const data = this.serviceRequestsService.SendEmail_for_Reschedule_SR(mail[x],req.body);
                  mg.messages().send(data, (error, body) => {
                    if (error) {
                      return res.json({ error: error.message });}});
                }
              }
              return res.status(200).json({message:'SR updated successfully.'});
            }else{
              return res.status(422).json({ message: "error while rescheduling sr"});
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          })
        } else {
          return res.status(400).json({ message: "Enter Valid Date to reschedule SR" });
        }
    }else{
      if(req.body.updatedAddress){
        const mail = await this.serviceRequestsService.User_SP_mail(req.body.serviceRequest);
          for (let x in mail) {
            const data = this.serviceRequestsService.SendEmail_for_Add_Upd(mail[x],req.body);
            mg.messages().send(data, (error, body) => {
              if (error) {
                return res.json({ error: error.message });}});
          }
          return res.status(200).json({message:'sr address updated successfully.'})
      }else{
        return res.status(201).json({message:'sr is unchanged.'});
      }
    }  
  }

    public cancelSR: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userTypeId === 2) {
          if (req.params.requestId) {
            return this.serviceRequestsService.getSRById(req.params.requestId)
              .then(async (ser_Req) => {
                if (ser_Req) {
                  if (ser_Req.Status === 3) {
                    return res.status(401).json({message: "SR is completed so it cannot be cancelled",
                      });
                  } else if (ser_Req.Status === 4) {
                    return res.status(401).json({ message: "service request is already cancelled." });
                  } else if (ser_Req.Status === 5) {
                    return res.status(401).json({ message: "service request already refunded." });
                  } else {
                    return this.serviceRequestsService.upd_SR(req.params.requestId, req.body.userId)
                      .then(async (upd_ser_req) => {
                        if (upd_ser_req[0] === 1) {
                          const mail =await this.serviceRequestsService.User_SP_mail(ser_Req);
                          for (let x in mail) {
                            const data = this.serviceRequestsService.SendEmail(mail[x],ser_Req.ServiceRequestId);
                            mg.messages().send(data, (error, body) => {
                              if (error) {
                                return res.json({ error: error.message });
                              }});
                          }
                          return res.status(200).json({message: "SR is cancelled successfully.",});
                        } else {
                          return res.status(422).json({ message: "error while cancelling" });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  }
                } else {
                  return res
                    .status(200)
                    .json({ message: "No SR Found" });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          } else {
            return res.status(422).json({ message: "Enter SR ID " });
          }
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      };

      public Modify_SR: RequestHandler = async (req,res,next): Promise<Response|void> => 
      {
        if (req.body.userTypeId === 2) {
          if (req.body.ServiceRequestId) {
            return this.serviceRequestsService.getSRById(req.body.ServiceRequestId)
              .then(async (ser_Req) => {
                if (ser_Req) {
                  req.body.serviceRequest = ser_Req;
                  if (ser_Req.Status === 1 || ser_Req.Status === 2) {
                    return this.serviceRequestsService.upd_SR_Add(req.body)
                      .then(async (upd_Req) => {
                        if (upd_Req) {
                          if (upd_Req[0] === 1) {
                            req.body.updatedAddress = true;
                            next();
                          } else {
                            return res.status(422).json({ message: "error while updating" });
                          }
                        } else {
                          req.body.updatedAddress = false;
                          next();
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  } else {
                    return res.status(401).json({message:"SR is already completed or cancelled ,Therefore it can not be edited or rescheduled.",
                    });
                  }
                } else {
                  return res.status(200).json({ message: "No SR Found" });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          } else {
            return res.status(422).json({ message: "Enter SR ID" });
          }
        } else {return res.status(401).json({ message: "Unauthorised User" });
        }
      };
  
    public getAllSR: RequestHandler = async (req,res): Promise<Response> => {
      if (req.body.userTypeId === 2 && req.body.userId) {
        return this.serviceRequestsService.getAllSR()
          .then((ser_Req) => {
            if (ser_Req && ser_Req.length > 0) {return res.status(200).json(ser_Req);
            } 
            else {
              return res.status(404).json({ message: "No SR Found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      } else {
        return res.status(401).json({ message: "Unauthorised user" });
      }
    };

    public filter_feature_SR: RequestHandler = async (req,res): Promise<Response> => {
        const filters: filter_features = req.body;
        if (req.body.userTypeId === 2) {
          return this.serviceRequestsService.getAllSR()
            .then(async (ser_Req) => {
              if (ser_Req && ser_Req.length > 0) {
                const f_List = await this.serviceRequestsService.filter_feature_SR(ser_Req,filters);
                return res.status(200).json(f_List);
              } else {
                return res.status(404).json({ message: "No SR found" });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      };
}  

