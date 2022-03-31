import { Request, Response, RequestHandler } from "express";
import { db } from "../../models/index";
import bcrypt from "bcrypt";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { Op } from "sequelize";
import mailgun from "mailgun-js";
import { FavoriteProviderService } from "./favouriteprovider.service";

require("dotenv").config();
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export class FavoriteProviderController {
    public constructor(
      private readonly favoriteProviderService: FavoriteProviderService) {
      this.favoriteProviderService = favoriteProviderService;
    }

    public create_Favor_Provider: RequestHandler = async (req,res,next): Promise<Response | void> => {
        const ProviderId = +req.params.helperId;
        console.log(ProviderId);
        const us_Id = +req.body.userId;
        //console.log(us_Id);
        
        if (req.body.userId && req.body.userTypeId === 4) {
          req.body.UserId = us_Id;
          req.body.TargetUserId = ProviderId;
          return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
            .then((ser_Req) => {
              const Provider_Ids =this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
              console.log(Provider_Ids);
              if (Provider_Ids.length > 0) {
                let Prov_List = false;
                for(let x in Provider_Ids)
                {
                  //console.log(Provider_Ids[x]===ProviderId)
                  console.log(ProviderId);
                  console.log(Provider_Ids[x]);
                  if(Provider_Ids[x]==ProviderId)
                  {
                    
                    Prov_List=true;
                    break;
                  }
                }
                console.log(Prov_List);
                //const Prov_List = Provider_Ids.includes(parseInt(req.params.helperId));
                if (Prov_List) {
                  if (req.body.IsFavorite) {
                    return this.favoriteProviderService.get_Fav_Provider(us_Id, ProviderId).then((favor) => {
                        if (favor) {
                          if (favor.IsFavorite) {
                            return res.status(409).json({message: "SP is already marked as Favourite",});
                          } else {
                            return this.favoriteProviderService.update_Fav_Provider(req.body)
                              .then((favor) => {
                                if (favor.length > 0) {
                                  res.status(201).json({message:"Favourite SP Added",});
                                } else {
                                  res.status(502).json({message: "error while Adding favorite SP",});
                                }
                              })
                              .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error: error });
                              });
                          }
                        } else {
                          req.body.IsBlocked = false;
                          return this.favoriteProviderService.create_Fav_Provider(req.body)
                            .then((favor_Prov) => {
                              if (favor_Prov) {
                                return res.status(200).json({message: "favorite SP is created now",});
                              }
                              return res.status(502).json({message: "error while adding favorite SP",});
                            })
                            .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                            });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                  } else if (req.body.IsFavorite === false) {next();} 
                  else {
                    return res.status(404).json({ message: "No Data Found" });
                  }
                } else {
                  return res.status(404).json({
                    message:"SP didnot Worked With You",});
                }
              } else {
                return res.status(404).json({
                  message: "No SP worked with You",});
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };

    public get_Provider_Cust_Relation: RequestHandler = async (req,res): Promise<Response> => {
        if (req.body.userId && req.body.userTypeId === 4) {
          return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
            .then((ser_Req) => {
              const Pro_Id =this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
              if (Pro_Id.length > 0) {
                return this.favoriteProviderService.get_Provider_Cust_Relation(Pro_Id)
                  .then((Provider) => {
                    if (Provider && Provider.length > 0) {
                      return res.status(200).json(Provider);
                    } else {
                      return res.status(404).json({message:"No SP Worked With You Previously",});
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              } else {
                return res.status(404).json({
                  message: "No SP Worked With You Previously",
                });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };

      public Remove_Fav_Provider: RequestHandler = async (req,res): Promise<Response|void> => {
        return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
          .then((result) => {
            if (result) {
              if (result.IsFavorite) {return this.favoriteProviderService.update_Fav_Provider(req.body)
                  .then(favour => {
                    if (favour) {
                      res.status(201).json({ message: "favorite SP updated" });
                    } else {res.status(502).json({message: "error while updating favorite SP",});
                    }
                  })
                  .catch((error: Error) => {console.log(error);
                    return res.status(500).json({ error: error });
                  });
              }else if(result.IsFavorite === false){
                return res.status(400).json({message:'SP is already Marked Favourite'});
              } else {
                return res.status(404).json({ message: "No SP in Favorite List" });
              }
            } else {
              return res.status(404).json({ message: "No SP in Favorite List" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      }; 

      public Removing_SP_From_Blocked_List:RequestHandler = async(req, res):Promise<Response|void> => {
        return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
          .then((result) => {
            if (result) {
              if (result.IsBlocked) {
                return this.favoriteProviderService.update_Block_Provider(req.body)
                  .then(block_Result => {
                    if (block_Result.length>0) {
                      res.status(200).json({ message: "SP is now unblocked" });
                    } else {
                      res.status(502).json({message: "error while Unblocking",});
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              }else if(result.IsBlocked === false){
                return res.status(401).json({message:'SP is already UnBlocked'});
              } else {
                return res
                  .status(404)
                  .json({ message: "No SP is Block List" });
              }
            } else {
              return res
                .status(404)
                .json({ message: "No SP in Favourite List" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      }

      public block_Provier:RequestHandler = async(req, res, next):Promise<Response|void> => {
        if (req.body.userId && req.body.userTypeId === 4) {
          req.body.UserId = req.body.userId;
          req.body.TargetUserId = req.params.helperId;
          return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
            .then((ser_Req) => {
              const Provider_Ids =this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
              if (Provider_Ids.length > 0) {
                //const Prov_list = Provider_Ids.includes(+req.params.helperId);
                let Prov_List = false;
                for(let x in Provider_Ids)
                {
                  //console.log(Provider_Ids[x]===ProviderId)
                  //console.log(ProviderId);
                  //console.log(Provider_Ids[x]);
                  if(Provider_Ids[x]==+req.params.helperId)
                  {
                    
                    Prov_List=true;
                    break;
                  }
                }
                console.log(Prov_List);
               
                if (Prov_List) {
                  if (req.body.IsBlocked) {
                    return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
                      .then((SP_Prov) => {
                        if (SP_Prov) {
                          if(SP_Prov.IsBlocked){
                            return res.status(409).json({message: "SP is already marked as Blocked"});
                          }else{
                            return this.favoriteProviderService.update_Block_Provider(req.body)
                            .then(upd_Pro => {
                              if (upd_Pro.length > 0) {
                                res.status(201).json({ message:"SP is blocked now",});
                              } else {res.status(500).json({ message: "error while blocking SP",});}
                            })
                            .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                            });
                          }
                        } else {
                          req.body.IsFavorite = false;
                          return this.favoriteProviderService.create_Fav_Provider(req.body)
                            .then((block_Prov) => {
                              if (block_Prov) {
                                return res.status(200).json({message: "blocked helper created successfully",});
                              }
                              return res.status(502).json({
                                message: "error in creating blocked helper",
                              });
                            })
                            .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                            });
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                    } else if (req.body.IsBlocked === false) {
                    next();
                  } else {
                    return res.status(404).json({ message: "No Data found" });
                  }
                } else {
                  return res.status(404).json({message: "this service provider has not worked with customer in past",});
                }
              } else {
                return res.status(404).json({message: "no service provider found worked with customer in past",});
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res.status(401).json({ message: "unauthorised user" });
        }
      };
}