import { Request, Response, RequestHandler } from 'express';
import { SubscribeUser } from "../models/subscribeuser";
import { SubscribeUserService } from './subscribeuser.service';
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});



export class SubscribeUserController{
    public constructor(private readonly subscribeUserService: SubscribeUserService){
        this.subscribeUserService = subscribeUserService;
    }

    public createSubscribeUser:RequestHandler = async (req, res):Promise<Response> => {
      const Email:string = req.body.Email;
      req.body.IsConfirmedSubscriber = true;
      if(Email){
        return this.subscribeUserService.getSubscribeUserByEmail(Email)
        .then(user => {
          if(!user){
            return this.subscribeUserService.createSubscribeUser(req.body)
            .then(user => {
              const data = this.subscribeUserService.createData(user.Email);
              mg.messages().send(data, function (error, body) {
                if (error) {
                  return res.json({
                    error: error.message,
                  });
                }
              });
              return res.status(200).json({
                  message:
                    "Subscription Email has been sent to you Email ID",
                });
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
              error: error
              });
          });
          }
          else{
            return res.status(400).json({mesage:'You are already a subscribed User'});
          }
        })
        .catch((error: Error) => {
                return res.status(500).json({
                error: error
                });
            });
      }
      else{
        return res.status(401).json({mesage:'something went wrong'});
      }
    };

    public sendEmailToAllSubscribers = async (req: Request, res: Response): Promise<Response> => {
      return this.subscribeUserService
        .getSubscribeUser()
        .then(async (SubscribeUser: SubscribeUser[]) => {
          if(SubscribeUser.length <= 0){
            return res.status(200).json({message:'users not found'});
          }else{
            const user = {...{ ...SubscribeUser }};
            const email:string[] = [];
            for(const subscribeUser in user){
              if(user[subscribeUser].IsConfirmedSubscriber === true){
                email.push((user[subscribeUser].Email));
              }
            };
            console.log(email);
            for(let e in email){
              const data = this.subscribeUserService.createDataForAll(email[e]);
              await mg.messages().send(data, function (error, body) {
                if (error) {
                  return res.json({
                    error: error.message,
                  });
                }
              });
            }
            return res.status(200).json({message:'Email sent successfully'});
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
      });
    };

    

    public getSubscribeUserById:RequestHandler = async (req , res): Promise<Response> => {
      return this.subscribeUserService
        .getSubscribeUserById(+req.params.id)
        .then(subscribeUser => {
          if (subscribeUser) {
            return res.status(200).json(subscribeUser);
          }else{
            return res.status(404).json({ error: 'NotFound' });
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };
  
    public getSubscribeUser = async (req: Request, res: Response): Promise<Response> => {
      return this.subscribeUserService
        .getSubscribeUser()
        .then((SubscribeUser: SubscribeUser[]) => {
          return res.status(200).json({ SubscribeUser });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
      });
    };
}