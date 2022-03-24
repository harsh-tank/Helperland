import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import { ServiceHistoryService } from "./servicehistory.service";
import mailgun from "mailgun-js";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { UserAddress } from "../../models/useraddress";
import exceljs from "exceljs";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";

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
        console.log('Inside SR Route');
        const Id = +req.params.id;
        console.log("Hello");
        console.log(Id);
        if (req.body.userTypeId === 3) {
          return this.serviceHistoryService.getSRDetailById(Id)
            .then((ser_Req) => {
              console.log(ser_Req);
              if (ser_Req?.ServiceProviderId === req.body.userId) {
                return res.status(200).json(ser_Req);
              } else {
                return res.status(404).json({
                  message: "SR Details Not Found",
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

    public getAllCompletedSR:RequestHandler = async(req, res):Promise<Response> => {
        return this.serviceHistoryService.getSRHistoryOfProvider(+req.body.userId)
        .then(async requestHistory => {
          if(requestHistory){
            if(requestHistory.length>0){
              const past_Data = this.serviceHistoryService.ValidateDateWithCurrent(requestHistory);
              if(requestHistory.length>0){
                const his_Data = await this.serviceHistoryService.PrintSRHistory(past_Data);
                if(his_Data.length>0){
                  return res.status(200).json(his_Data);
                }else{
                  return res.status(404).json({message:'No Past SR History Available'});
                }
              }else{
                return res.status(404).json({message:'No Past SR History Available'});
              }
            }else{
              return res.status(404).json({message:'Service request history not found'});
            }
          }else{
            return res.status(404).json({message:'Service request not found'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    };

    public PrintRatingsofSP:RequestHandler = async(req, res):Promise<Response> => {
        if (req.body.userTypeId === 3 && req.body.userId) {
          return this.serviceHistoryService.getRatingsOfProvider(req.body.userId)
          .then(async result => {
            if(result){
              const Print_data = await this.serviceHistoryService.PrintRatingsofSP(result);
              if(Print_data.length>0){
                return res.status(200).json(Print_data);
              }else{
                return res.status(404).json({ message: "data not found" });
              }
            }else{
              return res.status(404).json({ message: "ratings not found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({error: error});
          });
        } else {
          return res.status(401).json({ message: "Unauthorised User" });
        }
      };

    public Transfer_In_ExcelSheet:RequestHandler = async(req, res):Promise<Response|void> => {
        let Push_History = [];
        return this.serviceHistoryService.getSRHistoryOfProvider(+req.body.userId)
        .then(async req_His => {
          if(req_His){
            if(req_His.length>0){
              const pastDateHistory = this.serviceHistoryService.ValidateDateWithCurrent(req_His);
              if(req_His.length>0){
                Push_History = await this.serviceHistoryService.Push_Service_Data(pastDateHistory);
                let wb = new exceljs.Workbook();
                let ws = wb.addWorksheet("Service_History");
                ws.columns = [{ header: "ServiceId" ,   key: "ServiceId", width: 25 },{ header: "StartDate" ,   key: "StartDate", width: 25 },{ header: "Customer"  ,   key: "Customer" , width: 25 },
                  { header: "Payment"   ,   key: "Payment"  , width: 10 },];
                ws.addRows(Push_History);
                res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition","attachment; filename=" + "Service_History.xlsx"); 
                const data = await wb.xlsx.writeFile(`../Service_History.xlsx`)
                           .then(() => {
                             res.send({
                               status: "success",
                               message: "file successfully downloaded"
                              });
                           });
              }else{
                return res.status(404).json({message:'Data Not Available'});
              }
            }else{
              return res.status(404).json({message:'Data Not Available'});
            }
          }else{
            return res.status(404).json({message:'Data Not Available'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
      };
      
}