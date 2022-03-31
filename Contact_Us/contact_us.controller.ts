import { Request, Response, RequestHandler } from 'express';
import { Contact_Us } from "../models/contact_us";
import { Contact_UsService } from "./contact_us.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
require("dotenv").config();
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class Contact_UsController {
    public constructor(private readonly contact_usService: Contact_UsService) {
        this.contact_usService = contact_usService;
      }

      public createContact_Us = async (req: Request, res: Response): Promise<Response> => {
        // console.log(req.file);
         const f_Name: string = req.body.FirstName;
         const l_Name: string = req.body.LastName;
         const Full_Name: string = f_Name + " " + l_Name;
          req.body.UploadFileName = req.file?.originalname;
          req.body.Filepath = req.file?.path;
          req.body.Name = Full_Name;
           return this.contact_usService
             .createContact_Us(req.body)
             .then(async(user: Contact_Us) => {
               const ad_Emails = await this.contact_usService.admin_Emails();
               if(ad_Emails.length>0){
               for(let e in ad_Emails){
               const data = this.contact_usService.Send_Email(ad_Emails[e],Full_Name, req.body.Email,req.body.Subject, req.body.PhoneNumber, req.body.Message);
               mg.messages().send(data, (error, body) => {
                 if (error) {
                   return res.json({error: error.message});
                 }
               });
             }
           }
               return res.status(200).json({ user });
             })
             .catch((error: Error) => {
               return res.status(500).json({
                 error: error
               });
             });
         };
   

      public getContact_Us = async (req: Request, res: Response): Promise<Response>=> {
          return this.contact_usService.getContact_Us()
          .then((user:Contact_Us[])=>{
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };

      
      public getContact_UsById = async (req: Request, res: Response): Promise<Response> => {
        return this.contact_usService
          .getContact_UsById(+req.params.id)
          .then((user) => {
            if (user) {
              return res.status(200).json({ user });
            }
            return res.status(404).json({ error: 'NotFound' });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };
    
      public updateContact_Us = async (req: Request, res: Response): Promise<Response> => {
        return this.contact_usService
          .updateContact_Us(req.body,+req.params.id)
          .then((user) => {
              return res.status(200).json({ user });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };

      public deleteContact_Us = async (req: Request, res: Response): Promise<Response> => {
        return this.contact_usService
          .deleteContact_Us(+req.params.id)
          .then((user) => {
            if (user > 0) {
              return res.status(200).json({ user });
            }
            return res.status(404).json({ error: 'NotFound' });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };

      public validated_by: RequestHandler = async (req,res,next): Promise<Response | void> => {
        const token = req.headers.authorization! || req.header('x-auth');
        return this.contact_usService
          .getUserByEmail(req.body.Email)
          .then((user) => {
            if (user) {
              if (token) {
                jwt.verify(token, process.env.SECRET!, (error, user: any) => {
                  if (error) {
                    return res.status(303).json({ message: "invalid credentials" });
                  } 
                  else {
                    return this.contact_usService
                      .getUserByEmail(user.userEmail)
                      .then((user) => {
                        if (user === null) {
                          return res.status(401).json({ message: "No user found" });
                        }
                        req.body.CreatedBy = user.UserId;
                        next();
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({
                          error: error,
                        });
                      });
                  }
                });
              } 
              else {
                return res.status(401).json({ message: "You are already registered , plz login and try again" });
              }
            } 
            else {
                next();
            }
          })
          .catch((error: Error) => {
            return res.status(500).json({error: error,});
          });
      };
}