import express from 'express';
import { celebrate } from 'celebrate';

import { Contact_UsRepository } from "../Contact_Us/contact_us.repository";
import { Contact_UsSchema } from "../Contact_Us/contact_us.model";
import { Contact_UsService } from "../Contact_Us/contact_us.service";
import { Contact_UsController } from "../Contact_Us/contact_us.controller";


const { update, get, add_Con } = Contact_UsSchema;


const router: express.Router = express.Router();

const repo: Contact_UsRepository = new Contact_UsRepository();
const service: Contact_UsService= new Contact_UsService(repo);
const controller: Contact_UsController = new Contact_UsController(service);


/**
 *@swagger
 * definitions:
 *  Contact_Us:
 *   type: object
 *   properties:
 *    Name:
 *     type: string
 *     description: name of the user
 *     example: 'Harsh Tank'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'harshptank2212@gmail.com'
 *    Subject:
 *     type: string
 *     description: subject
 *    PhoneNumber:
 *     type: string
 *     description: phone number
 *     example: '1234567810'
 *    Message:
 *     type: string
 *     description: designation of the employee
 *     example: 'about helperland'
 *    UploadFileName:
 *     type: string
 *     description: The file to upload
 *    Filepath:
 *     type: string
 *     description: Path of file
 *    CreatedBy:
 *     type: integer
 *     description: Created by 
 */


 /**
 * @swagger
 * /create_contact_us:
 *  post:
 *   summary: create user
 *   description: create user for contact
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/Contact_Us'
 *   responses:
 *    200:
 *     description: user created succesfully
 *    500:
 *     description: failure in creating user
 */
router.post('/create_contact_us', celebrate(add_Con), controller.createContact_Us);

/**
 * @swagger
 *  /contact_us/{id}:
 *   get:
 *    summary: get contact_us by id
 *    description: get contact_us by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the contact_us
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
router.get('/contact_us/:id', celebrate(get), controller.getContact_UsById);


/**
 * @swagger
 * /contact_us:
 *  get:
 *   summary: get all contact_us
 *   description: get all contact_us
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
router.get('/contact_us', controller.getContact_Us);

/**
 * @swagger
 *  /contact_us/{id}:
 *   put:
 *    summary: update contact_us by id
 *    description: update contact_us by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the contact_us
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */

router.put('/contact_us/:id', celebrate(update),controller.updateContact_Us);

/**
 * @swagger
 *  /contact_us/{id}:
 *   delete:
 *    summary: delete contact_us by id
 *    description: delete contact_us by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the contact_us
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */

router.delete('/contact_us/:id', celebrate(get), controller.deleteContact_Us);

export = router;
