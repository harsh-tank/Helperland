import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user";
import { LoginService } from "./login.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();


export class LoginController {
  public constructor(private readonly loginService: LoginService) {
    this.loginService = loginService;
  }

  public confirmLogin: RequestHandler = async (req,res): Promise<Response> => {
    return this.loginService
      .getUserByEmail(req.body.Email)
      .then(async (user: User | null) => {
        if (user) {
          const registered = this.loginService.isRegistered(user);
          if (registered) {
            const Confirm = await bcrypt.compare(
              req.body.Password,
              user.Password!
            );
            if (Confirm) {
              const token = this.loginService.createToken(user.Email!);
              if(user.UserTypeId === 4){
                return res
                  .status(200).cookie("token", token, { expires:new Date(Date.now()+600000),httpOnly: true })
                  .json({ message: "login successful as customer" });
              }
              else if(user.UserTypeId === 3){
                return res.status(200).cookie("token", token, { expires:new Date(Date.now()+600000),httpOnly: true })
                  .json({ message: "login successful as Service provider" });
              }
              else if(user.UserTypeId === 1){
                return res
                  .status(200).cookie("token", token, { expires:new Date(Date.now()+600000),httpOnly: true })
                  .json({ message: "login successful as super user" });
              }
              else{
                return res
                  .status(200).cookie("token", token, { expires:new Date(Date.now()+600000),httpOnly: true })
                  .json({ message: "login successful as admin" });
              }
            }
            return res
              .status(401)
              .json({ message: "Invalid Username or Password" });
          }
          return res.json({ message: "Register your account" });
        }
        return res
          .status(401)
          .json({ message: "Invalid Username or Password" });
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public authenticateToken: RequestHandler = async (req, res, next) => {
    const token = req.header('x-auth');
    if (token == null) {
      return res.status(401).json({ message: "invalid login credential null" });
    }
   jwt.verify(token, process.env.SECRET!,(err, user:any) => {
      if (err) {
        return res.status(401).json({message:'invalid login credential'});
      } else {
       // console.log(user);
        return this.loginService.getUserByEmail(user.userEmail)
        .then(user => {
          
          if(user === null){
            return res.status(401).json({message:'Unauthorised user'});
          }
          else next();
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
        
      }
    });
  };

}
