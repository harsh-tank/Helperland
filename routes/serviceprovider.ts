import express from "express";
import { Request, Response, RequestHandler } from "express";
import { celebrate } from "celebrate";

import { ServiceRequestRepository } from "../Service Provider's Screen/New Service Request/newservicerequest.repository";
import { ServiceRequestService } from "../Service Provider's Screen/New Service Request/newservicerequest.service";
import { ServiceRequestController } from "../Service Provider's Screen/New Service Request/newservicerequest.controller";

import { UpcomingServicesRepository } from "../Service Provider's Screen/Upcoming Services/upcomingservices.repository";
import { UpcomingService } from "../Service Provider's Screen/Upcoming Services/upcomingservices.service";
import { UpcomingServiceController } from "../Service Provider's Screen/Upcoming Services/upcomingservices.controller";

import { ServiceHistoryRepository } from "../Service Provider's Screen/Service History/servicehistory.repository";
import { ServiceHistoryController } from "../Service Provider's Screen/Service History/servicehistory.controller";
import { ServiceHistoryService } from "../Service Provider's Screen/Service History/servicehistory.service";

import { MySettingsSchema } from "../Service Provider's Screen/My Settings/mysettings.model";
import { MySettingsRepository } from "../Service Provider's Screen/My Settings/mysettings.repository";
import { MySettingsService } from "../Service Provider's Screen/My Settings/mysettings.service";
import { MySettingsController } from "../Service Provider's Screen/My Settings/mysettings.controller";

import { BlockCustomerSchema } from "../Service Provider's Screen/Block Customer/blockcustomer.model";
import { BlockCustomerRepository } from "../Service Provider's Screen/Block Customer/blockcustomer.repository";
import { BlockCustomerService } from "../Service Provider's Screen/Block Customer/blockcustomer.service";
import { BlockCustomerController } from "../Service Provider's Screen/Block Customer/blockcustomer.controller";

import { LoginSchema } from '../Login/login.model';
import { LoginRepository } from '../Login/login.repository';
import { LoginService } from '../Login/login.service';
import { LoginController} from '../Login/login.controller';

const { Upd_User, Reset_Pass } = MySettingsSchema;
const { Cust_Block } = BlockCustomerSchema;

const router: express.Router = express.Router();

const serviceRequestRepository: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(serviceRequestRepository);
const serviceRequestController: ServiceRequestController =new ServiceRequestController(serviceRequestService);

const upcomingServiceRepository: UpcomingServicesRepository =new UpcomingServicesRepository();
const upcomingService: UpcomingService = new UpcomingService(upcomingServiceRepository);
const upcomingServiceController: UpcomingServiceController = new UpcomingServiceController(upcomingService);

const serviceHistoryRepository: ServiceHistoryRepository =new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(serviceHistoryRepository);
const serviceHistoryController: ServiceHistoryController = new ServiceHistoryController(serviceHistoryService);

const mySettingsRepository: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(mySettingsRepository);
const mySettingsController: MySettingsController = new MySettingsController(mySettingsService);


const blockCustomerRepository: BlockCustomerRepository =new BlockCustomerRepository();
const blockCustomerService: BlockCustomerService = new BlockCustomerService(blockCustomerRepository);
const blockCustomerController: BlockCustomerController =new BlockCustomerController(blockCustomerService);

const loginRepository: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepository);
const loginController: LoginController = new LoginController(loginService);


/**
 *@swagger
 * definitions:
 *  Blocked:
 *   type: object
 *   properties:
 *    IsBlocked:
 *     type: boolean
 *     example: 'true'
 *  UpdateUser:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Harsh'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Tank'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "1234567890"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "01-01-2000"
 *    NationalityId:
 *     type: integer
 *     description: nationality
 *     example: 1 
 *    Gender:
 *     type: string
 *     description: gender
 *     example: "Male / Female"
 *    Address:
 *      type: object
 *      properties:
 *       StreetName:
 *        type: string
 *        description: address
 *        example: 'XYZ'
 *       HouseNumber:
 *        type: string
 *        description: house number
 *        example: '007'
 *       PostalCode:
 *        type: string
 *        description: zipcode
 *        example: '380005'
 *       City:
 *        type: string
 *        description: city
 *        example: 'Ahemdabad'
 *  ChangePassword:
 *   type: object
 *   properties: 
 *    OldPassword:
 *     type: string
 *     description: password
 *     example: '123456'
 *    NewPassword:
 *     type: string
 *     description: password
 *     example: 'xyz123'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'xyz123'
 */
//New Service Request's Routes
/**
 * @swagger
 * /get_all_new_sr_sp:
 *  get:
 *   summary: New serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service requests not found / helper not found.
 *    500:
 *     description: internal server error.
 */
router.get("/get_all_new_sr_sp",loginController.authenticateToken,serviceRequestController.getAllNewSR);

/**
 * @swagger
 * /accept_new_sr_sp/{requestId}:
 *  get:
 *   summary: Accept service request
 *   description: SP can accept new service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    400: 
 *     description: Invalid Input.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request / error in accepting service request.
 *    422:
 *     description: another service request has already been assigned which has time overlap with this service request. You can’t pick this one! / this service request is no more available. It has been assigned to another provider
 *    500:
 *     description: internal server error.
 */
router.get("/accept_new_sr_sp/:requestId",loginController.authenticateToken,serviceRequestController.IsSRAcceptable,serviceRequestController.acceptNewSR);

/**
 * @swagger
 * /get_sr_detail_by_id_sp/{requestId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 * 
 */

router.get("/get_sr_detail_by_id_sp/:requestId",loginController.authenticateToken,serviceRequestController.getServiceRequestById);

//Upcoming Services Routes
/**
 * @swagger
 * /get_all_upcoming_sr_sp:
 *  get:
 *   summary: Upcoming service request
 *   description: display upcoming service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: upcoming service requests.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no upcoming service requests found.
 *    500:
 *     description: internal server error.
 * 
 */

router.get("/get_all_upcoming_sr_sp",loginController.authenticateToken,upcomingServiceController.getAllUpcomingSR);

/**
 * @swagger
 * /cancel_sr_sp/{requestId}:
 *  put:
 *   summary: Cancel service request
 *   description: Cancel service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    400:
 *     description: Enter SR ID.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in cancelling service request
 *    500:
 *     description: internal server error.
 */

router.put("/cancel_sr_sp/:requestId",loginController.authenticateToken,upcomingServiceController.cancelSR);

/**
 * @swagger
 * /complete_sr_sp/{requestId}:
 *  put:
 *   summary: Complete service request
 *   description: complete service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request completed successfully.
 *    400:
 *     description: You can not complete service request before end time / service request id not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in updating service request
 *    500:
 *     description: internal server error.
 */
router.put("/complete_sr_sp/:requestId",loginController.authenticateToken,upcomingServiceController.completeSR);

/**
 * @swagger
 * /get_service_detail_sp/{id}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens  
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 * 
 */
router.get("/get_service_detail_sp/:id",loginController.authenticateToken,upcomingServiceController.getServiceRequestDetailById);

//Service History Routes
/**
 * @swagger
 * /get_sr_detail_by_id_sp/{id}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 * 
 */
router.get("/get_sr_detail_by_id_sp/:id",loginController.authenticateToken,serviceHistoryController.getSRDetailById);

/**
 * @swagger
 * /get_all_completed_sr_sp:
 *  get:
 *   summary:  Completed Serivce request  
 *   description: Completed service request 
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request history.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past / service request not found.
 *    500:
 *     description: internal server error.
 */
router.get("/get_all_completed_sr_sp",loginController.authenticateToken,serviceHistoryController.getAllCompletedSR);

/**
 * @swagger
 * /get_history_in_excel_sp:
 *  get:
 *   summary: Excel History
 *   description: download history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no data to export.
 *    500:
 *     description: internal server error.
 * 
 */
router.get("/get_history_in_excel_sp",loginController.authenticateToken,serviceHistoryController.Transfer_In_ExcelSheet);

/**
 * @swagger
 * /get_rating_of_sp:
 *  get:
 *   summary:  Ratings
 *   description:  Get Ratings of SP
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: ratings.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: ratings / data not found.
 *    500:
 *     description: internal server error.
 */
router.get("/get_rating_of_sp",loginController.authenticateToken,serviceHistoryController.PrintRatingsofSP);

//Block Customer Routes
/**
 * @swagger
 * /get_all_completed_sr_bc:
 *  get:
 *   summary: Display customers
 *   description: list of customers worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: customers.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: customers not found.
 *    500:
 *     description: internal server error.
 * 
 */
router.get("/get_all_completed_sr_bc",loginController.authenticateToken,blockCustomerController.getCompletedSRofProvider);

/**
 * @swagger
 * /cust_bl_un_bc/{userId}:
 *  put:
 *   summary: Block unblock customer
 *   description: block unblock customer worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: customer successfully added in block / unblock list.
 *    201:
 *     description: customer alraedy in blocked/unblocked list.
 *    400: 
 *     description: helper has not worked for this customer. / proper input not found in request body.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past / no customer in blocklist to unblock.
 *    422:
 *     description: error in adding blocked / unblocked list.
 *    500:
 *     description: internal server error.
 */

router.put("/cust_bl_un_bc/:userId",celebrate(Cust_Block),loginController.authenticateToken,blockCustomerController.Cust_BlockList,blockCustomerController.Cust_UnBlockList);

//My Settings
/**
 * @swagger
 * /get_user_detail_by_Id_MS:
 *  get:
 *   summary: Service provider detail
 *   description: display service provider details.
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

router.get("/get_user_detail_by_Id_MS",loginController.authenticateToken,mySettingsController.get_User_Detail_ById);

/**
 * @swagger
 * /Upd_details_MS:
 *  put:
 *   summary: Update service provider detail
 *   description: edit user details to update.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateUser'
 *   responses:
 *    200:
 *     description: details updated successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422: 
 *     description: error in updating user detail.
 *    500:
 *     description: internal server error.
 */

router.put("/Upd_details_MS",celebrate(Upd_User),loginController.authenticateToken,mySettingsController.update_User_DetailById,mySettingsController.Create_Or_Upd_Add);

/**
 * @swagger
 * /Reset_Pass_MS:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ChangePassword'
 *   responses:
 *    200:
 *     description: password changed successfully.
 *    400:
 *     description: incorrect old password or new Password and confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in changing password.
 *    500:
 *     description: internal server error.
 * 
 */
router.put("/Reset_Pass_MS",celebrate(Reset_Pass),loginController.authenticateToken,mySettingsController.change_Pass);

export = router;