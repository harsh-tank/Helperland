import moment from "moment";
import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";
import { ServiceHistoryService } from "./servicehistory.service";
import exceljs from "exceljs";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class ServiceHistoryController {
        public constructor(private readonly serviceHistoryService: ServiceHistoryService) {
                this.serviceHistoryService = serviceHistoryService;
              }

              public getSRDetailById: RequestHandler = async (req,res): Promise<Response> => {
                const Id = +req.params.id;
                if (req.body.userTypeId === 4) {
                  return this.serviceHistoryService.getSRDetailById(Id)
                    .then((ser_Req_Detail) => {
                      if (ser_Req_Detail?.UserId === req.body.userId) {
                        return res.status(200).json(ser_Req_Detail);
                      } else {
                        return res.status(404).json({
                          message: "No service request detail found for this ID",
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

              public getSRHistoryOfUser:RequestHandler = async(req, res):Promise<Response> => {
                return this.serviceHistoryService.getSRHistoryOfUser(+req.body.userId)
                .then(requestHistory => {
                  if(requestHistory){
                    if(requestHistory.length>0){
                      const Ser_History = this.serviceHistoryService.Confirm_valid_date(requestHistory);
                      if(requestHistory.length>0){
                        return res.status(200).json(Ser_History);
                      }else{
                        return res.status(404).json({message:'No Service request history found'});
                      }
                    }else{
                      return res.status(404).json({message:'No Service request history found'});
                    }
                  }else{
                    return res.status(404).json({message:'No Service request history found'});
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
              };
            
              public Transfer_In_ExcelSheet:RequestHandler = async(req, res):Promise<Response|void> => {
                let PushHistory = [];
                return this.serviceHistoryService.getSRHistoryOfUser(+req.body.userId)
                .then(async req_History => {
                  if(req_History){
                    if(req_History.length>0){
                      const pastDateHistory = this.serviceHistoryService.Confirm_valid_date(req_History);
                      if(req_History.length>0){
                        PushHistory = await this.serviceHistoryService.Push_Service_Data(pastDateHistory);
                        let work_book = new exceljs.Workbook();
                        let work_sheet = work_book.addWorksheet("Service_History");
                        work_sheet.columns = [
                          { header: "ServiceId" ,        key: "ServiceId", width: 10 },
                          { header: "StartDate" ,        key: "StartDate", width: 25 },
                          { header: "ServiceProvider" ,  key: "ServiceProvider" , width: 25 },
                          { header: "Payment"   ,        key: "Payment"  , width: 10 },
                          { header: "Status"   ,         key: "Status"  , width: 15 }
                        ];
                        work_sheet.addRows(PushHistory);
                        res.setHeader(
                          "Content-Type",
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        );
                        res.setHeader(
                          "Content-Disposition",
                          "attachment; filename=" + "Service_History.xlsx"
                        ); 
                          const data = await work_book.xlsx.writeFile(`../Service_History.xlsx`)
                           .then(() => {
                             res.send({
                               status: "success",
                               message: "file successfully downloaded"
                              });
                           });
                      }else{
                        return res.status(404).json({message:'No Data Available'});
                      }
                    }else{
                      return res.status(404).json({message:'No Data Available'});
                    }
                  }else{
                    return res.status(404).json({message:'No Data Available'});
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({error: error});
                });
              }; 
              
        public rating_of_SP: RequestHandler = async (req,res): Promise<Response> => {
                const serviceId = +req.params.serviceId;
                req.body.RatingDate = new Date();
                return this.serviceHistoryService.FetchRatingsBySR_Id(serviceId)
                .then(rate => {
                  if(rate){
                    return res.status(201).json({message:'Ratings is already given'});
                  }else{
                    if(serviceId){
                      return this.serviceHistoryService.getSRDetailById(serviceId)
                      .then(ser_Req => {
                        if(ser_Req){
                          req.body.ServiceRequestId = ser_Req.ServiceRequestId;
                          if(req.body.userTypeId === 4 && req.body.userId === ser_Req.UserId){
                            req.body.RatingFrom = ser_Req.UserId;
                            if(ser_Req.Status === 3 && ser_Req.ServiceProviderId){
                              req.body.RatingTo = ser_Req.ServiceProviderId;
                              req.body.Ratings = this.serviceHistoryService.get_avg_Ratings(req.body);
                              return this.serviceHistoryService.Input_Ratings(req.body)
                              .then(rate => {
                                return res.status(200).json(rate);
                              })
                              .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({
                                  error: error,
                                });
                              });
                            }else{
                              return res.status(400).json({message:'service request not completed or service provider not found'});
                            }
                          }else{
                            return res.status(401).json({message:'unauthorised user'});
                          }
                        }else{
                          return res.status(404).json({message:'No service request'});
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({
                          error: error,
                        });
                      })
                    }else{
                      return res.status(404).json({message:'No service request id found'});
                    }
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });   
              };        
              
}
