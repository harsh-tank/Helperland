"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const newservicerequest_repository_1 = require("../Service Provider's Screen/New Service Request/newservicerequest.repository");
const newservicerequest_service_1 = require("../Service Provider's Screen/New Service Request/newservicerequest.service");
const newservicerequest_controller_1 = require("../Service Provider's Screen/New Service Request/newservicerequest.controller");
const upcomingservices_repository_1 = require("../Service Provider's Screen/Upcoming Services/upcomingservices.repository");
const upcomingservices_service_1 = require("../Service Provider's Screen/Upcoming Services/upcomingservices.service");
const upcomingservices_controller_1 = require("../Service Provider's Screen/Upcoming Services/upcomingservices.controller");
const servicehistory_repository_1 = require("../Service Provider's Screen/Service History/servicehistory.repository");
const servicehistory_controller_1 = require("../Service Provider's Screen/Service History/servicehistory.controller");
const servicehistory_service_1 = require("../Service Provider's Screen/Service History/servicehistory.service");
const mysettings_model_1 = require("../Service Provider's Screen/My Settings/mysettings.model");
const mysettings_repository_1 = require("../Service Provider's Screen/My Settings/mysettings.repository");
const mysettings_service_1 = require("../Service Provider's Screen/My Settings/mysettings.service");
const mysettings_controller_1 = require("../Service Provider's Screen/My Settings/mysettings.controller");
const blockcustomer_model_1 = require("../Service Provider's Screen/Block Customer/blockcustomer.model");
const blockcustomer_repository_1 = require("../Service Provider's Screen/Block Customer/blockcustomer.repository");
const blockcustomer_service_1 = require("../Service Provider's Screen/Block Customer/blockcustomer.service");
const blockcustomer_controller_1 = require("../Service Provider's Screen/Block Customer/blockcustomer.controller");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const { Upd_User, Reset_Pass } = mysettings_model_1.MySettingsSchema;
const { Cust_Block } = blockcustomer_model_1.BlockCustomerSchema;
const router = express_1.default.Router();
const serviceRequestRepository = new newservicerequest_repository_1.ServiceRequestRepository();
const serviceRequestService = new newservicerequest_service_1.ServiceRequestService(serviceRequestRepository);
const serviceRequestController = new newservicerequest_controller_1.ServiceRequestController(serviceRequestService);
const upcomingServiceRepository = new upcomingservices_repository_1.UpcomingServicesRepository();
const upcomingService = new upcomingservices_service_1.UpcomingService(upcomingServiceRepository);
const upcomingServiceController = new upcomingservices_controller_1.UpcomingServiceController(upcomingService);
const serviceHistoryRepository = new servicehistory_repository_1.ServiceHistoryRepository();
const serviceHistoryService = new servicehistory_service_1.ServiceHistoryService(serviceHistoryRepository);
const serviceHistoryController = new servicehistory_controller_1.ServiceHistoryController(serviceHistoryService);
const mySettingsRepository = new mysettings_repository_1.MySettingsRepository();
const mySettingsService = new mysettings_service_1.MySettingsService(mySettingsRepository);
const mySettingsController = new mysettings_controller_1.MySettingsController(mySettingsService);
const blockCustomerRepository = new blockcustomer_repository_1.BlockCustomerRepository();
const blockCustomerService = new blockcustomer_service_1.BlockCustomerService(blockCustomerRepository);
const blockCustomerController = new blockcustomer_controller_1.BlockCustomerController(blockCustomerService);
const loginRepository = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepository);
const loginController = new login_controller_1.LoginController(loginService);
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
router.get("/get_all_new_sr_sp", loginController.authenticateToken, serviceRequestController.getAllNewSR);
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
router.get("/accept_new_sr_sp/:requestId", loginController.authenticateToken, serviceRequestController.IsSRAcceptable, serviceRequestController.acceptNewSR);
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
router.get("/get_sr_detail_by_id_sp/:requestId", loginController.authenticateToken, serviceRequestController.getServiceRequestById);
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
router.get("/get_all_upcoming_sr_sp", loginController.authenticateToken, upcomingServiceController.getAllUpcomingSR);
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
router.put("/cancel_sr_sp/:requestId", loginController.authenticateToken, upcomingServiceController.cancelSR);
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
router.put("/complete_sr_sp/:requestId", loginController.authenticateToken, upcomingServiceController.completeSR);
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
router.get("/get_service_detail_sp/:id", loginController.authenticateToken, upcomingServiceController.getServiceRequestDetailById);
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
router.get("/get_sr_detail_by_id_sp/:id", loginController.authenticateToken, serviceHistoryController.getSRDetailById);
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
router.get("/get_all_completed_sr_sp", loginController.authenticateToken, serviceHistoryController.getAllCompletedSR);
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
router.get("/get_history_in_excel_sp", loginController.authenticateToken, serviceHistoryController.Transfer_In_ExcelSheet);
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
router.get("/get_rating_of_sp", loginController.authenticateToken, serviceHistoryController.PrintRatingsofSP);
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
router.get("/get_all_completed_sr_bc", loginController.authenticateToken, blockCustomerController.getCompletedSRofProvider);
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
router.put("/cust_bl_un_bc/:userId", (0, celebrate_1.celebrate)(Cust_Block), loginController.authenticateToken, blockCustomerController.Cust_BlockList, blockCustomerController.Cust_UnBlockList);
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
router.get("/get_user_detail_by_Id_MS", loginController.authenticateToken, mySettingsController.get_User_Detail_ById);
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
router.put("/Upd_details_MS", (0, celebrate_1.celebrate)(Upd_User), loginController.authenticateToken, mySettingsController.update_User_DetailById, mySettingsController.Create_Or_Upd_Add);
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
router.put("/Reset_Pass_MS", (0, celebrate_1.celebrate)(Reset_Pass), loginController.authenticateToken, mySettingsController.change_Pass);
module.exports = router;
