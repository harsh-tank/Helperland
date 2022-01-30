"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact_UsController = void 0;
class Contact_UsController {
    constructor(contact_usService) {
        this.contact_usService = contact_usService;
        this.getContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .getContact_Us()
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.createContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //   const firstName:string = req.body.FirstName;
            //   const lastName:string = req.body.LastName;
            //   const Name:string = firstName+" "+lastName;
            //  req.body.Name = Name;
            //  req.body.UploadFileName = req.file?.originalname;
            //  req.body.FilePath = req.file?.path;
            return this.contact_usService
                .createContact_Us(req.body)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContact_UsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .getContact_UsById(+req.params.id)
                .then((user) => {
                if (user) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .updateContact_Us(req.body, +req.params.id)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteContact_Us = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contact_usService
                .deleteContact_Us(+req.params.id)
                .then((user) => {
                if (user > 0) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.contact_usService = contact_usService;
    }
}
exports.Contact_UsController = Contact_UsController;
