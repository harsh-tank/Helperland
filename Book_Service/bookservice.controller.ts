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
                    return res
                      .status(401)
                      .json({ message: "expired or invalid token" });
                  } else {
                    const userEmail = user.userEmail;
                    const postalCode = req.body.postalcode;
                    const token = this.bookService.createToken(userEmail,postalCode);
                    return res
                      .status(200)
                      .cookie("token", token, { httpOnly: true });
                  }
                }
              );
              return res.status(200).json({ message: " Availability found" });
            } else {
              return res.status(404).json({
                message:
                  "We are not providing service in this area. We will notify you if any helper would start working near your area.",
              });
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

  public getUserAddresses: RequestHandler = async (req, res): Promise<Response | undefined> => {
    let U_add: UserAddress[] = [];
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
                          return res
                            .status(401)
                            .json({ message: " No Address found" });
                        }
                      } else {
                        return res
                          .status(401)
                          .json({ message: " No User Address found" });
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

  public createUserAddress: RequestHandler = async (req, res) => {
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
                    .then((address) => {
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
              });
          }
        }
      );
    }
  };

  public decodeToken: RequestHandler = async (req,res,next):Promise<Response|undefined> => {
    const token = req.header('x-auth');
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
  };

  public createFavoriteAndBlocked: RequestHandler = async (req,res): Promise<Response> => {
    return this.bookService.createFavoriteAndBlocked(req.body)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public CreateServiceRequest: RequestHandler = async (req, res, next) => {
    req.body.Status = 1;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.ServiceHourlyRate = 18;
    req.body.SubTotal = this.bookService.getSubTotal(req.body.ServiceHourlyRate,req.body.ServiceHours);
    req.body.TotalCost = this.bookService.getTotalCost(req.body.ExtraService,req.body.SubTotal);
    req.body.ServiceRequestAddress.Email = req.body.Email;
    if(req.body.ServiceHours<3)
    {
      return res.json({message:"Service Hours Should be atleast 3 or More !"})
    }
    return this.bookService
      .getUserByEmail(req.body.Email)
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
        return this.bookService
          .createServiceRequestWithAddress(req.body)
          .then((request) => {
            if (request) {
              return this.bookService.getProviderByZipCode(request.ZipCode)
                .then(async (user) => {
                  if (user.length > 0) {
                    for (let x in user) {
                      email.push(user[x].Email!);
                    }
                    for (let y in email) {
                      console.log(email[y]);
                      const data = await this.bookService.createTemp(
                        email[y]
                      );
                      await mg.messages().send(data, function (error, body) {
                        if (error) {
                          return res.json({
                            error: error.message,
                          });
                        }
                      });
                    }
                    return res
                      .status(200)
                      .json({ message: "service is booked now" });
                  } else {
                    return res.status(404).json({ message: "user not found" });
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
            } else {
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
      //
  };

  public getFavoriteAndBlocked: RequestHandler = async (req,res):Promise<Response | undefined> => {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization,process.env.SECRET!,(error, user: any) => {
          if (error) {
            return res.status(401).json({ message: "expired or invalid token" });
          } else {
            return this.bookService.getUserByEmail(user.userEmail)
              .then((user) => {
                if (user === null) {
                  return res.status(404).json({ message: "No user found" });
                } else {
                  return this.bookService.getFavoriteAndBlocked(user.UserId)
                    .then(async (user) => {
                      if (user === null) {
                        return res
                          .status(404)
                          .json({ message: "No user found" });
                      } else {
                        let favoriteprovider = await this.bookService.getTargetUser(
                          user
                        );
                        if (favoriteprovider.length > 0) {
                          return this.bookService
                            .getUserById(favoriteprovider)
                            .then((provider) => {
                              return res.status(200).json(provider);
                            })
                            .catch((error) => {
                              console.log(error);
                              return res.status(500).json({
                                error: error,
                              });
                            });
                        } else {
                          return res.status(404).json({ message: "No favorite Service Provider found" });
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                }
              })
              .catch((error) => {
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
}