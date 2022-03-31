"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const contact_us_repository_1 = require("../Contact_Us/contact_us.repository");
const contact_us_model_1 = require("../Contact_Us/contact_us.model");
const contact_us_service_1 = require("../Contact_Us/contact_us.service");
const contact_us_controller_1 = require("../Contact_Us/contact_us.controller");
const { update, get, add_Con } = contact_us_model_1.Contact_UsSchema;
const router = express_1.default.Router();
const repo = new contact_us_repository_1.Contact_UsRepository();
const service = new contact_us_service_1.Contact_UsService(repo);
const controller = new contact_us_controller_1.Contact_UsController(service);
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
*   tags:
*    - Contact_US API
*   parameters:
*    - in: header
*      name: x-auth
*      schema:
*       type: string
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
router.post('/create_contact_us', (0, celebrate_1.celebrate)(add_Con), controller.validated_by, controller.createContact_Us);
/**
 * @swagger
 *  /contact_us/{id}:
 *   get:
 *    summary: get contact_us by id
 *    description: get contact_us by id
 *    tags:
 *    - Contact_US API
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
router.get('/contact_us/:id', (0, celebrate_1.celebrate)(get), controller.getContact_UsById);
/**
 * @swagger
 * /contact_us:
 *  get:
 *   summary: get all contact_us
 *   description: get all contact_us
 *   tags:
 *    - Contact_US API
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
 *    tags:
 *    - Contact_US API
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
router.put('/contact_us/:id', (0, celebrate_1.celebrate)(update), controller.updateContact_Us);
/**
 * @swagger
 *  /contact_us/{id}:
 *   delete:
 *    summary: delete contact_us by id
 *    description: delete contact_us by id
 *    tags:
 *    - Contact_US API
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
router.delete('/contact_us/:id', (0, celebrate_1.celebrate)(get), controller.deleteContact_Us);
module.exports = router;
