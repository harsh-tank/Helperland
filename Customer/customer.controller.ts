import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user";
import { CustomerService } from "./customer.service";
import bcrypt from "bcrypt";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});
const UserTypeId: number = 4;
const salt: number = 10;
export class CustomerController {
    public constructor(private readonly customerService: CustomerService) {
        this.customerService = customerService;
      }

    public createCustomer: RequestHandler = async (req, res): Promise<Response> => {
        req.body.UserTypeId = UserTypeId;
        req.body.IsRegisteredUser = true;
        //console.log(req.body);
        const Confirm = req.body.Password === req.body.Confirm_Password;
        if (!Confirm) {
            return res.json({ message: "Password does not match " });
          }
          else
          {
            return this.customerService
            .getCustomerByEmail(req.body.Email)
            .then(async(user) => {
              if (user) {
                return res
                  .status(303)
                  .json({ message: "Email already registered" });
              }
              
                  
                  req.body.Password = await bcrypt.hash(
                    req.body.Password,
                    salt
                  );
                  return this.customerService
                    .createCustomer(req.body)
                    .then((user: User) => {
                      const data = this.customerService.createData(user.Email!);
                      mg.messages().send(data, function (error, body) {
                        if (error) {
                          return res.json({
                            error: error.message,
                          });
                        }
                      });
                      return res
                        .status(200)
                        .json({
                          message:
                            "Email sent as your registeration confirms, Check Email in Spam Folder",
                        });
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                
                
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json(error);
            });
          }
          
       };
      }
