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
              if(user.UserTypeId === 1){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful customer" });
              }
              else if(user.UserTypeId === 2){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful Service provider" });
              }
              else{
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
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
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ message: "invalid token" });
    }
    jwt.verify(token, process.env.SECRET!, (err, user) => {
      if (err) {
        return res.status(403).json({message:'invalid token'});
      } else {
        next();
      }
    });
  };

  public deleteToken:RequestHandler = (req, res)=>{
    try {
      res.clearCookie('token');
      return res.status(200).json({message:'successfully logout'})
    } catch (error) {
      return res.status(401).json({message:'failed'});
    }
  }
}
