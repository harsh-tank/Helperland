import { Request, Response } from 'express';
import { Contact_Us } from "../models/contact_us";
import { Contact_UsService } from "./contact_us.service";

export class Contact_UsController {
    public constructor(private readonly contact_usService: Contact_UsService) {
        this.contact_usService = contact_usService;
      }

      public getContact_Us = async (req: Request, res: Response): Promise<Response>=> {
          return this.contact_usService
          .getContact_Us()
          .then((user:Contact_Us[])=>{
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };

      public createContact_Us = async (req: Request, res: Response): Promise<Response> => {
      //   const firstName:string = req.body.FirstName;
      //   const lastName:string = req.body.LastName;
      //   const Name:string = firstName+" "+lastName;
      //  req.body.Name = Name;
      //  req.body.UploadFileName = req.file?.originalname;
      //  req.body.FilePath = req.file?.path;
        return this.contact_usService
          .createContact_Us(req.body)
          .then((user: Contact_Us) => {
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
}