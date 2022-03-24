import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { UpcomingService } from "./upcomingservices.service";
import mailgun from "mailgun-js";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class UpcomingServiceController {
    public constructor(private readonly upcomingService: UpcomingService) {
        this.upcomingService = upcomingService;
      }

    public cancelSR: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userId && req.body.userTypeId === 3) {
          if (req.params.requestId) {
            return this.upcomingService
              .getServiceRequestById(req.params.requestId)
              .then((ser_Req) => {
                if (ser_Req) {
                  if (ser_Req.ServiceProviderId === req.body.userId) {
                    return this.upcomingService
                      .cancelSR(req.params.requestId, req.body.userId)
                      .then((up_req) => {
                        if (up_req[0] === 1) {
                          return res.status(200).json({
                            message: "service request cancelled successfully",
                          });
                        } else {
                          return res.status(422).json({
                            message: "error while cancelling service request",
                          });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  } else {
                    return res.status(401).json({ message: "unauthorised user" });
                  }
                } else {
                  return res
                    .status(404)
                    .json({ message: "service request detail not found" });
                }
              });
          } else {
            return res
              .status(400)
              .json({ message: "service request id not found" });
          }
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };
    

    public getAllUpcomingSR: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userId && req.body.userTypeId === 3) {
          return this.upcomingService.getAllUpcomingSR(req.body.userId)
            .then((ser_Req) => {
              if (ser_Req) {
                if (ser_Req.length > 0) {
                  return res.status(200).json(ser_Req);
                } else {
                  return res
                    .status(404)
                    .json({ message: "upcoming service requests not found" });
                }
              } else {
                return res
                  .status(404)
                  .json({ message: "upcoming service requests not found" });
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

      public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response> => {
        const Id = +req.params.id;
        if (req.body.userTypeId === 3) {
          return this.upcomingService.getServiceDetailById(Id)
            .then((serviceRequestDetail) => {
              if (serviceRequestDetail?.ServiceProviderId === req.body.userId) {
                return res.status(200).json(serviceRequestDetail);
              } else {
                return res.status(404).json({
                  message: "service request details Not found for this request",
                });
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

      public completeSR: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userId && req.body.userTypeId === 3) {
          if (req.params.requestId) {
            return this.upcomingService.getServiceRequestForCR(req.params.requestId)
              .then((ser_Req) => {
                if (ser_Req) {
                  if (ser_Req.ServiceProviderId === req.body.userId) {
                    return this.upcomingService.isValidRequestTime(ser_Req)
                      .then((serviceRequest) => {
                        if (serviceRequest) {
                          return this.upcomingService
                            .completeSR(req.params.requestId,req.body.userId)
                            .then((updatedrequest) => {
                              if (updatedrequest[0] === 1) {
                                return res.status(200).json({
                                    message:"service request is completed successfully",
                                  });
                              } else {
                                return res.status(422).json({
                                    message: "error while updating service request",
                                  });
                              }
                            })
                            .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                            });
                        } else {
                          return res.status(400).json({
                              message:
                                "You can not complete service request before end time",
                            });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  } else {
                    return res.status(401).json({ message: "unauthorised user" });
                  }
                } else {
                  return res
                    .status(404)
                    .json({ message: "service request detail not found" });
                }
              });
          } else {
            return res
              .status(400)
              .json({ message: "service request id not found" });
          }
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };
}
