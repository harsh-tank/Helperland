"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const login_controller_1 = require("../Login/login.controller");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const bookservice_repository_1 = require("../Book_Service/bookservice.repository");
const bookservice_controller_1 = require("../Book_Service/bookservice.controller");
const bookservice_service_1 = require("../Book_Service/bookservice.service");
const bookservice_model_1 = require("../Book_Service/bookservice.model");
const router = express_1.default.Router();
const loginRepository = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepository);
const loginController = new login_controller_1.LoginController(loginService);
const bookRepository = new bookservice_repository_1.BookServiceRepository();
const bookService = new bookservice_service_1.BookService(bookRepository);
const bookController = new bookservice_controller_1.BookServiceController(bookService);
const { zipcode_match, U_Add, Create_Ser } = bookservice_model_1.BookServiceSchema;
/**
 *@swagger
 * definitions:
 *  ServiceRequest:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: ServiceId
 *     example: 1
 *    ServiceStartDate:
 *     type: date
 *     description: date
 *     example: '01-01-2022'
 *    ServiceStartTime:
 *     type: string
 *     description: time
 *     example: '10:00'
 *    ServiceHours:
 *     type: integer
 *     description: hours
 *     example: 3
 *    Comments:
 *     type: string
 *     description: comment
 *     example: 'XYZ'
 *    PaymentDue:
 *     type: boolean
 *     example: 'false'
 *    HasPets:
 *     type: boolean
 *     example: 'True'
 *    ServiceRequestAddress:
 *     type: object
 *     properties:
 *      AddressLine1:
 *       type: string
 *       description: Address Line 1
 *       example: 'B-32'
 *      AddressLine2:
 *       type: string
 *       description: Address Line 2
 *       example: 'Ravipark'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '1234567890'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '380005'
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId:
 *        type: integer
 *        description: extra service
 *        example: 1
 *  ConfirmZipCode:
 *   type: object
 *   properties:
 *    postalcode:
 *     type: string
 *     description: postal code
 *     example: '380005'
 *  UserAddress:
 *     type: object
 *     properties:
 *      AddressLine1:
 *       type: string
 *       description: Address Line 2
 *       example: 'B-32'
 *      Addressline2:
 *       type: string
 *       description: Address Line 2
 *       example: 'Raviprak'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      IsDefault:
 *       type: boolean
 *       example: 'true'
 *      IsDeleted:
 *       type: boolean
 *       example: 'false'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '1234567890'
 */
/**
 * @swagger
 * /confirm-zipcode:
 *  post:
 *   summary: Check SP Provide Service in the given postal code
 *   description: Enter zip code
 *   tags:
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ConfirmZipCode'
 *   responses:
 *    200:
 *     description: service provider found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: We are not providing service in this area.
 *    500:
 *     description: failure in finding service provider.
 *
 */
router.post('/confirm-zipcode', (0, celebrate_1.celebrate)(zipcode_match), loginController.authenticateToken, bookController.confirmServiceAvailable);
/**
 * @swagger
 * /create-ser_request:
 *  post:
 *   summary: Create Service Request
 *   description: Enter Necessary Data
 *   tags:
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceRequest'
 *   responses:
 *    200:
 *     description: service booked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in service booking.
 */
router.post('/create-ser_request', (0, celebrate_1.celebrate)(Create_Ser), loginController.authenticateToken, bookController.decodeToken, bookController.CreateServiceRequest);
/**
 * @swagger
 * /user-address:
 *  post:
 *   summary: Create Address
 *   description: Enter address
 *   tags:
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserAddress'
 *   responses:
 *    200:
 *     description: address created successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in creating address.
 */
router.post('/user-address', (0, celebrate_1.celebrate)(U_Add), loginController.authenticateToken, bookController.createUserAddress);
/**
 * @swagger
 * /user-addresses:
 *  get:
 *   summary: Get user addresses
 *   description: get address
 *   tags:
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: address found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found or Addresses not found
 *    500:
 *     description: failure in finding address
 */
router.get('/user-addresses', loginController.authenticateToken, bookController.getUserAddresses);
router.post('/create-favorite-blocked', loginController.authenticateToken, bookController.createFavoriteAndBlocked);
/**
 * @swagger
 * /create-favorite-blocked:
 *  get:
 *   summary: Get favorite and blocked
 *   description: favorite and blocked user
 *   tags:
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: user found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in finding user
 */
router.get('/create-favorite-blocked', loginController.authenticateToken, bookController.getFavoriteAndBlocked);
module.exports = router;
