import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { db } from "../../models/index";
import { User } from "../../models/user";
import mailgun from "mailgun-js";
import { UserAddress } from "../../models/useraddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequestRepository } from "./newservicerequest.repository";
import { Request, Response, RequestHandler } from "express";
import { ServiceRequestService } from "./newservicerequest.service";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class ServiceRequestController {
    public constructor(private readonly serviceRequestService: ServiceRequestService) {
        this.serviceRequestService = serviceRequestService;
      }
    
    public getServiceRequestById: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userTypeId === 3) {
          return this.serviceRequestService.getServiceRequestById(req.params.requestId)
            .then((ser_Req_info) => {
              if (ser_Req_info) {
                return res.status(200).json(ser_Req_info);
              } else {
                return res
                  .status(404)
                  .json({ message: "request detail not available" });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
                error: error,
              });
            });
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      };
    
    public IsSRAcceptable: RequestHandler = async (req,res,next): Promise<Response | void> => {
        if (req.params.requestId) {
          return this.serviceRequestService.getServiceRequestById(req.params.requestId)
            .then((ser_Req) => {
              if (ser_Req) {
                req.body.ZipCode = ser_Req.ZipCode;
                return this.serviceRequestService.getAllServiceRequestsOfProvider(req.body.userId)
                  .then(async (serviceRequests) => {
                    req.body.totalHour =ser_Req.ExtraHours + ser_Req.ServiceHours;
                    if (serviceRequests) {
                      const { srId, confirm } =await this.serviceRequestService.SPTimeConflict(ser_Req.ServiceStartDate,serviceRequests,req.body.totalHour,ser_Req.ServiceStartTime);
                      if (confirm) {
                        return res.status(422).json({
                          message:"Another service request " +srId +" has already been assigned which has time overlap with this service request. You can’t pick this one!",
                        });
                      } else {
                        next();
                      }
                    } else {
                      next();
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              } else {
                return res.status(422).json({
                  message:
                    "This service request is no more available. It has been assigned to another provider",
                });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid Input" });
        }
      };

      public acceptNewSR: RequestHandler = async (req,res): Promise<Response> => {
        return this.serviceRequestService.acceptNewSR(req.params.requestId, req.body.userId)
          .then((up_Ser_Req) => {
            if (up_Ser_Req[0] === 1) {
              return this.serviceRequestService.getServiceProvidersByZipCode(req.body.ZipCode)
                .then((Provider) => {
                  if (Provider) {
                    for (let hp in Provider) {
                      if (Provider[hp].Email === req.body.email) {
                        continue;
                      }
                      const data = this.serviceRequestService.createEmail(Provider[hp].Email!,req.params.requestId!);
                      mg.messages().send(data, (error, body) => {
                        if (error) {
                          return res.json({ error: error.message });
                        }
                      });
                    }
                  }
                  return res
                    .status(200)
                    .json({ message: "service request is accepted now" });
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({ error: error });
                });
            } else {
              return res
                .status(404)
                .json({ message: "error While accepting request" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      }; 

    public getAllNewSR: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userTypeId === 3) {
          if (req.body.userId) {
            return this.serviceRequestService.getServiceProviderDetailById(req.body.userId)
              .then((Provider) => {
                if (Provider) {
                  if (Provider.ZipCode === null) {
                    return res.status(404).json({
                      message:"Plz enter your Zipcode",
                    });
                  } else {
                    return this.serviceRequestService
                      .getAllUnAcceptedServiceRequestByZipcode(Provider.ZipCode!,req.body.userId)
                      .then(async (ser_Req) => {
                        if (ser_Req && ser_Req.length>0) {
                          const sRequests =await this.serviceRequestService.IsSPComfortableWithPets(req.body.PetsAtHome,ser_Req);
                          if (sRequests && sRequests.length>0) {
                            const requestDetail =await this.serviceRequestService.PrintSRDetail(sRequests);
                            return res.status(200).json(requestDetail);
                          } else {
                            return res
                              .status(404)
                              .json({ message: "No Service Request Found" });
                          }
                        } else {
                          return res
                            .status(404)
                            .json({ message: "No Service Request Found" });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  }
                } else {
                  return res.status(404).json({ message: "No Service Provider Found" });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          } else {
            return res
              .status(422)
              .json({ message: "Service Provider Id is Not Found" });
          }
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };  

}
