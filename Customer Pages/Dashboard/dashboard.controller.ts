import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";
import { DashboardService } from "./dashboard.service";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class DashboardController {

    public constructor(private readonly dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
      }

    public getSRDetailById: RequestHandler = async (req,res): Promise<Response> => {
        const Id = +req.params.id;
        if (req.body.userTypeId === 4) {
          return this.dashboardService.getSRDetailById(Id)
            .then((SRDetail) => {
              if (SRDetail?.UserId === req.body.userId) {
                return res.status(200).json(SRDetail);
              } else {
                return res.status(404).json({
                  message: "No details Found",
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

    public getAllSRByUserId: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userTypeId === 4) {
          return this.dashboardService
            .getAllSRByUserId(req.body.userId)
            .then((ser_Req) => {
              if (ser_Req) {
                if (ser_Req.length > 0) {
                  return res.status(200).json(ser_Req);
                } else {
                  return res.status(404).json({ message: "All Service Request has been Completed" });
                }
              } else {
                return res.status(404).json({ message: "User has not created any Service Request" });
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

      public Reschedule_Service_Check: RequestHandler = async (req,res,next): Promise<Response | undefined> => {
        const srId = req.params.serviceId;
        const Confirm = this.dashboardService.Confirm_valid_date(req.body.date);
        if (Confirm) {
          if (req.body.userTypeId === 4) {
            return this.dashboardService.getSRDetailById(+srId)
              .then((ser_Req) => {
                if (ser_Req) {
                  req.body.totalHour =ser_Req.ExtraHours + ser_Req.ServiceHours;
                  if (ser_Req.UserId === req.body.userId) {
                    if (ser_Req.ServiceProviderId) {
                      req.body.spId = ser_Req.ServiceProviderId;
                      return this.dashboardService
                        .getAllSROfProvider(ser_Req.ServiceProviderId)
                        .then(async (serviceRequest) => {
                          if (serviceRequest) {
                            const { conflict, Ser_Req_Date, startTime, endTime } =
                              await this.dashboardService.TimeConflictOfProvider(req.body.date,serviceRequest,req.body.totalHour,req.body.time);
                            if (conflict) {
                              return res.status(200).json({
                                  message:
                                    "Another service request has been assigned to the service provider on " + Ser_Req_Date +" from " + startTime +
                                    " to " + endTime +". Either choose another date or pick up a different time slot.",
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
                          return res.status(500).json({
                            error: error,
                          });
                        });
                    } else {
                      next();
                    }
                  } else {
                    return res.status(404).json({ message: "No data Available" });
                  }
                } else {
                  return res.status(404).json({ message: "Service request not Available" });
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
        } else {
          return res.status(400).json({ message: "Rescheduled date must be in future" });
        }
      };
    
      public Confirm_reschedule: RequestHandler = async (req,res): Promise<Response> => {
        const req_d: string = req.body.date;
        const date = req_d.split("-").reverse().join("-");
        const { spId } = req.body;
        if (req.params.serviceId) {
          return this.dashboardService.rescheduleSR(new Date(date),req.body.time,+req.params.serviceId,req.body.userId)
            .then((ser_Request) => {
              if (ser_Request.length > 0) {
                if (spId) {
                  return this.dashboardService
                    .getProviderById(spId)
                    .then((Provider) => {
                      if (Provider?.Email) {
                        const data = this.dashboardService.createData(req_d,req.body.time,Provider.Email,req.params.serviceId);
                        mg.messages().send(data, function (error, body) {
                          if (error) {
                            return res.json({
                              error: error.message,
                            });
                          }
                        });
                        return res.status(200).json({message: "Your Request to Reschedule Service is successfully Fullfilled",});
                      } else {
                        return res.status(404).json({ message: "No Service Provider not found" });
                      }
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                }
                return res.status(200).json({ message: "Your Request to Reschedule Service is successfully Fullfilled" });
              } else {
                return res.status(422).json({ message: "Error while rescheduling service request" });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
                error: error,
              });
            });
        } else {
          return res.status(404).json({ message: "Id for Service Request is not Found" });
        }
      }; 


      public cancel_Ser_Req: RequestHandler = async (req,res): Promise<Response | void> => {
        const srId  = req.params.serviceId;
        if (srId) {
          return this.dashboardService.getSRDetailById(+srId)
            .then((ser_Request) => {
              if (ser_Request) {
                if (ser_Request.Status === 4) {
                  return res.status(201).json({ message: "Service request is Canceled" });
                }else if (ser_Request.Status === 3) {
                  return res.status(201).json({ message: "Service is Already Completed" });
                } else {
                  if (ser_Request.UserId === req.body.userId) {
                    return this.dashboardService.update_SR_Status(+srId,+req.body.userId)
                      .then((ser_request) => {
                        if (ser_request.length > 0) {
                          if (ser_Request.ServiceProviderId) {
                            return this.dashboardService.getProviderById(ser_Request.ServiceProviderId)
                              .then((Provider) => {
                                if (Provider?.Email) {
                                  const data = this.dashboardService.cancelData(Provider.Email,srId);
                                  mg.messages().send(data, function (error, body) {
                                    if (error) {
                                      return res.json({
                                        error: error.message,
                                      });
                                    }
                                  });
                                  return res.status(200).json({message:"Service Request is Cancelled Now",  });
                                } else {
                                  return res.status(404).json({ message: "No Service Provider Found" });
                                }
                              })
                              .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({
                                  error: error,
                                });
                              });
                          } else {
                            return res.status(201).json({
                                message: "service request is cancelled now",
                              });
                          }
                        } else {
                          return res.status(400).json({message: "error while canceling service request",});
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({
                          error: error,
                        });
                      });
                  } else {
                    return res.status(401).json({ message: "User is Unauthorised" });
                  }
                }
              } else {
                return res.status(404).json({ message: "No service request found " });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
                error: error,
              });
            });
        } else {
          return res.status(404).json({ message: "No service request found with this id" });
        }
      };

}