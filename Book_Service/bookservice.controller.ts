import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { db } from "../models";
import { Request, Response, RequestHandler } from "express";
import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { BookService } from "./bookservice.service";
require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});
let email: string[] = [];
export class BookServiceController {
  public constructor(private readonly bookService: BookService) {
    this.bookService = bookService;
  }

  public confirmServiceAvailable: RequestHandler = async (req,res): Promise<Response> => {
    const token = req.headers.authorization! || req.header('x-auth')!;
    if (!req.body.postalcode) {
      return res.status(400).json({ message: "Plz enter Zipcode" });
    } else {
      //console.log("Inside else");
      return this.bookService
        .getAllProvider()
        .then((provider) => {
          //console.log("provider present"); 
          let isAvailable;
          if (provider) {
            for (let p in provider) {
              console.log(provider[p].FirstName);
              if (provider[p].ZipCode === req.body.postalcode) {
                isAvailable = true;
              }
            }
            if (isAvailable) {
              jwt.verify(req.header('x-auth')!,process.env.SECRET!,(err,user:any) => {
                  if (err) {
                    return res.status(401).json({ message: "expired or invalid token" });
                  } else {const userEmail = user.userEmail;
                    const postalCode = req.body.postalcode;
                    const token = this.bookService.createToken(userEmail,postalCode);
                    return res.status(200).cookie("token", token, { httpOnly: true });
                  }
                }
              );
              return res.status(200).json({ message: " Availability found" });
            } else {
              return res.status(404).json({message:"We are not providing service in this area. We will notify you if any helper would start working near your area.",});
            }
          } else {
            return res.status(301).json({ message: "No Service Provider found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    }
  };

  public createUserAddress: RequestHandler = async (req, res) => {
    const token = req.headers.authorization || req.header('auth');
    if (req.header('x-auth')) {
      jwt.verify(req.header('x-auth')!,process.env.SECRET!,(error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "expired or invalid token" });
          } else {
            req.body.Email = user.userEmail;
            req.body.PostalCode = user.ZipCode;
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((user) => {
                if (user) {
                  req.body.UserId = user.UserId;
                  return this.bookService
                    .createUserAddress(req.body)
                    .then((add) => {
                      return res.status(200).json({ message: "Address created successfully" });
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                } else {
                  return res.status(404).json({ message: "user not found" });
                }
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });}}
      );
    }};


  public getUserAddresses: RequestHandler = async (req, res): Promise<Response | undefined> => {
    let U_add: UserAddress[] = [];
    const token = req.headers.authorization! || req.header('auth')!;
    if (req.header('x-auth')) {
      jwt.verify(req.header('x-auth')!,process.env.SECRET!,
        (error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "expired or invalid token" });
          } else {
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((userByEmail) => {
                if (userByEmail) {
                  return this.bookService
                    .getUserAddress(userByEmail.UserId)
                    .then((users) => {
                      if (users.length > 0) {
                        for (let x in users) {
                          if (users[x].PostalCode === user.ZipCode) {
                            U_add.push(users[x]);
                          }
                        }
                        if (U_add.length > 0) {
                          return res.status(200).json(U_add);
                        } else {
                          return res.status(401).json({ message: " No Address found" });
                        }
                      } else {
                        return res.status(401).json({ message: " No User Address found" });
                      }
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                } else {
                  return res.status(301).json("user not found");
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
          }
        }
      );
    } else {
      return res.status(401).json({ message: "expired or invalid token" });
    }
  };

  public decodeToken: RequestHandler = async (req,res,next):Promise<Response|undefined> => {
    const token = req.header('x-auth');
    const isValidDate = await this.bookService.ValidateWithToday_Date(req.body.ServiceStartDate);
    if(isValidDate){
      req.body.ServiceStartDate = new Date(req.body.ServiceStartDate.toString().split('-').reverse().join('-'));
      if (token) {
      jwt.verify(token, process.env.SECRET!, (err, user: any) => {
        if (err) {
          return res.status(401).json({ message: "expired or invalid token" });
        } else {
          req.body.ZipCode = user.ZipCode;
          req.body.Email = user.userEmail;
          return this.bookService
            .getUserByEmail(user.userEmail)
            .then((user) => {
              if (user?.UserTypeId === 4) {
                next();
              } else {
                return res.status(401).json({ message: "unauthorised user" });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
                error: error,
              });
            });
        }
      });
    } else {
      return res.status(401).json("expired or invalid token");
    }
  }
  else{return res.status(401).json({message:'enter valid date to book service'});} 
  };

  public createFavoriteAndBlocked: RequestHandler = async (req,res): Promise<Response> => {
    return this.bookService.createFavoriteAndBlocked(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public CreateServiceRequest: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization! || req.header('auth')!;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.ServiceHourlyRate = 18;
    req.body.SubTotal = this.bookService.getSubTotal(req.body.ServiceHourlyRate,req.body.ServiceHours);
    req.body.TotalCost = this.bookService.getTotalCost(req.body.ExtraService,req.body.SubTotal);
    req.body.ServiceRequestAddress.Email = req.body.Email;
    if(req.body.ServiceProviderId){req.body.Status = 2;}
    else{req.body.Status = 1;}
    if(req.body.ServiceHours<3)
    {
      return res.json({message:"Service Hours Should be atleast 3 or More !"})
    }
    return this.bookService.getUserByEmail(req.body.Email)
      .then((user) => {
        if (user) {
          if (user.UserTypeId === 4) {
            req.body.UserId = user.UserId;
            req.body.ModifiedBy = user.UserId;
          } else {
            return res.status(401).json({ message: "User is unauthorized" });
          }
        } else {
          return res.status(404).json("User not found");
        }
        //console.log(req.body);
        return this.bookService
          .createServiceRequestWithAddress(req.body)
          .then((result) => {
            if (result) {
              if(result.ServiceProviderId){
                return this.bookService.getProviderById(result.ServiceProviderId)
                .then(helper => {
                  if(helper){
                    const data = this.bookService.DirectAssign(helper.Email!, result.ServiceRequestId);
                    mg.messages().send(data, (error, user) => {
                      if(error){
                        return res.json({
                          error: error.message,
                        });
                      }
                    })
                  }else{
                    return res.status(404).json({ message: "Service Provider Not Found"});
                  }
                  return res.status(200).json({ message: "service booked successfully" });
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
              }
              else{
                return this.bookService.getProviderByZipCode(result.ZipCode)
                .then(async (helper) => {
                  if (helper.length > 0) {
                    const hp = await this.bookService.getBlockedCustomerofProvider(+req.body.userId, helper);
                    return this.bookService.getAllBlockedProviderofUser(+req.body.userId, hp)
                    .then(async blockedHelper => {
                      if(blockedHelper){
                        const users = await this.bookService.Fetchout_Blocked_Provider(hp,blockedHelper);
                      email = this.bookService.SendEmailBasedOnHasPets(users, req.body);
                      console.log(email);
                      for (let e in email) {
                        console.log(email[e]);
                        const data = await this.bookService.createTemp(
                          email[e]
                        );
                        await mg.messages().send(data, function (error, body) {
                          if (error) {
                            return res.json({
                              error: error.message,
                            });
                          }
                        });
                      }
                      }
                        return res.status(200).json({ message: "service booked successfully" });
                      
                      
                      })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({error: error});
                    });
                  } else {
                    return res.status(404).json({ message: "user not found" });
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({error: error,});
                });
            } 
          }
            else {
              return res.status(500).json({ message: "error" });
            }
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
        return res.status(500).json({
          error: error,
        });
      });
  };

  public getFavoriteAndBlocked: RequestHandler = async (req,res):Promise<Response|void> => {
    const token = req.headers.authorization! || req.header('x- auth')!;
      jwt.verify(token,process.env.SECRET!,(error, userToken: any) => {
          if (error) {
            return res.status(401).json({ message: "invalid or expired token" });
          } else {
            if(req.body.userTypeId === 4 && req.body.userId){
              return this.bookService.getFavoriteAndBlocked(req.body.userId)
                    .then(async (result) => {
                      if (result === null) {
                        return res.status(404).json({ message: "No Service Provider in Favourite List" });
                      } else {
                        let fav_Provider = await this.bookService.getRequiredUser(result, userToken.postalCode);
                        if (fav_Provider.length > 0) {
                          return res.status(200).send(fav_Provider);
                        } else {
                          return res
                            .status(404)
                            .json({ message: "favorite helper not found" });
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({ error: error });
                    });
            }else{
              return res.status(401).json({message:'unauthorised user'});
            }}
        }
      );};
}