import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, RequestHandler } from "express";
import { ForgotPasswordService } from "./forgotpassword.service";
import mailgun from "mailgun-js";
require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

const salt: number = 10;

export class ForgotPasswordController {
    public constructor(private readonly forgotpasswordService: ForgotPasswordService) {
      this.forgotpasswordService = forgotpasswordService;
    }
  
    public forgotPassword: RequestHandler = async (req,res): Promise<Response> => {
      const Email: string = req.body.Email;
      if (Email) {
        return this.forgotpasswordService
          .getUserByEmail(Email)
          .then((user) => {
            if (!user) {
              return res.status(400)
                .json({ message: "User does not exist with this email" });
            }
            const Link = this.forgotpasswordService.createToken(user.Email);
            const temp = this.forgotpasswordService.createData(user.Email!,Link);
            mg.messages().send(temp, function (error, body) {
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
                  "An email with a link to reset-password is send to your email",
              });
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json(error);
          });
      } else {
        return res.status(400).json({ message: "Not Working" });
      }
    };
  
    public resetPassword: RequestHandler = async (req,res): Promise<Response | undefined> => {
      const resetLink: string = req.body.resetLink;
      if (resetLink) {
        jwt.verify(resetLink,process.env.FORGOT_PASSWORD!,(error, decodedlink: any) => {
            if (error) {
              return res
                .status(401)
                .json({ message: "Incorrect or expired token" });
            }
            const Same = req.body.changedPassword===req.body.confirm_changedPassword;
            if (!Same) {
            return res.json({ message: "Changed & confirm Password does not match " });
            }
            else{
              const userEmail: string = decodedlink.userEmail;
              return this.forgotpasswordService
                .getUserByEmail(userEmail)
                .then(async (user) => {
                  if (!user) {
                    return res
                      .status(400)
                      .json({ error: "User does not exist with this token" });
                  }
                  const Confirm = await bcrypt.compare(
                    req.body.changedPassword,
                    user.Password!
                  );
                  if (Confirm) {
                    return res
                      .status(200)
                      .json({
                        message:
                          "You used the Same password.Choose different password",
                      });
                  } else {
                    user.Password = await bcrypt.hash(
                      req.body.changedPassword,
                      salt
                    );
                    return this.forgotpasswordService
                      .updateUser(user.Password, user.Email)
                      .then((user) => {
                        return res
                          .status(200)
                          .json({ message: "password successfully Updated", user });
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json(error);
                      });
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json(error);
                });
            }
            
          }
        );
      } else {
        return res.status(400).json({ message: "something went wrong" });
      }
    };
  }
  