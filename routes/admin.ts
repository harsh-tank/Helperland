import express from "express";
import { Request, Response, RequestHandler } from "express";
import { celebrate } from "celebrate";

import { LoginSchema } from '../Login/login.model';
import { LoginRepository } from '../Login/login.repository';
import { LoginService } from '../Login/login.service';
import { LoginController} from '../Login/login.controller';

import { SR_Schema } from "../Admin Screen/Service Requests/servicerequests.model";
import { ServiceRequestsRepository } from "../Admin Screen/Service Requests/servicerequests.repository";
import { ServiceRequestsService } from "../Admin Screen/Service Requests/servicerequests.service";
import { ServiceRequestsController } from "../Admin Screen/Service Requests/servicerequests.controller";

import { UserManagementRepository } from "../Admin Screen/User Management/usermanagement.repository";
import { UserManagementService } from "../Admin Screen/User Management/usermanagement.service";
import { UserManagementController } from "../Admin Screen/User Management/usermanagement.controller";

const {upd_SR} = SR_Schema

const router: express.Router = express.Router();

const serviceRequestRepository: ServiceRequestsRepository = new ServiceRequestsRepository();
const serviceRequestService: ServiceRequestsService = new ServiceRequestsService(serviceRequestRepository);
const serviceRequestController: ServiceRequestsController =new ServiceRequestsController(serviceRequestService);

const userManagementRepository: UserManagementRepository = new UserManagementRepository();
const userManagementService: UserManagementService = new UserManagementService(userManagementRepository);
const userManagementController: UserManagementController =new UserManagementController(userManagementService);

const loginRepository: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepository);
const loginController: LoginController = new LoginController(loginService);

/**
 *@swagger
 * definitions:
 *  Active:
 *   type: object
 *   properties:
 *    Active:
 *     type: boolean
 *     example: 'true'
 *  Filters:
 *   type: object
 *   properties:
 *    ServiceRequestId:
 *     type: integer
 *     description: service request id
 *     example: 1 
 *    Status:
 *     type: string
 *     description: status
 *     example: 'Pending'
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '380005'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'harshptank2212@gmail.com'
 *    UserId:
 *     type: integer
 *     description: user id
 *     example: 1
 *    ServiceProviderId:
 *     type: integer
 *     description: service provider id
 *     example: 1
 *    HasIssue:
 *     type: boolean
 *     example: 'false'
 *    FromDate:
 *     type: string
 *     description: from date
 *     example: "01-01-2022"
 *    ToDate:
 *     type: string
 *     description: to date
 *     example: "02-01-2022"
 *  upd_SR:
 *   type: object
 *   properties:
 *    AddressLine1:
 *     type: string
 *     description: address
 *     example: 'New Shaktivijay'
 *    AddressLine2:
 *     type: string
 *     description: house number
 *     example: '44'
 *    City:
 *     type: string
 *     description: city
 *     example: 'Surat'
 *    Notes:
 *     type: string
 *     description: notes
 *     example: 'notes'
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '395006'
 *    RescheduleReason:
 *     type: string
 *     description: reschedule reason
 *     example: 'reason'
 *    ServiceRequestId:
 *     type: integer
 *     description: service request id
 *     example: 9
 *    ServiceStartDate:
 *     type: string
 *     description: service start date
 *     example: "16/03/2022"
 *    ServiceTime:
 *     type: string
 *     description: service start time
 *     example: "17:30" 
 */

//Admin Service Requests
/**
 * @swagger
 * /get-all_SR_ADS:
 *  get:
 *   summary: All serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service requests.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service requests not found.
 *    500:
 *     description: internal server error.
 */
router.get('/get-all_SR_ADS',loginController.authenticateToken,serviceRequestController.getAllSR);

/**
 * @swagger
 * /filter-feature_SR_ADS:
 *  post:
 *   summary: Filter SR
 *   description: Filters By Admin
 *   tags: 
 *    - Admin Screens
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Filters'
 *   responses:
 *    200:
 *     description: sevice requests.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: service requests not found.
 *    500:
 *     description: internal server error.
 * 
 */

router.post('/filter-feature_SR_ADS',loginController.authenticateToken,serviceRequestController.filter_feature_SR);

/**
 * @swagger
 * /cancel-SR_ADS/{requestId}:
 *  get:
 *   summary: Cancel SR
 *   description: Cancel SR By Ser_ID
 *   tags: 
 *    - Admin Screens
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
 *     description: SR is cancelled now.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token or completed service request can not cancel or service request already cancelled / refunded.
 *    404:
 *     description: No SR found.
 *    422:
 *     description: error while canceling service or ServiceRequestId not found in request request.
 *    500:
 *     description: internal server error.
 * 
 */
router.get('/cancel-SR_ADS/:requestId',loginController.authenticateToken,serviceRequestController.cancelSR);

/**
 * @swagger
 * /SR_edit_Reschedule_ADS:
 *  post:
 *   summary: Edit SR
 *   description: change detail to update service request
 *   tags: 
 *    - Admin Screens
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/upd_SR'
 *   responses:
 *    200:
 *     description: service request updated successfully or service request address updated successfully.
 *    201: 
 *     description: no change in service request.
 *    400: 
 *     description: enter future date for reschedule service request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    422: 
 *     description: error in rescheduling service request.
 *    500:
 *     description: internal server error.
 * 
 */
router.post('/SR_edit_Reschedule_ADS',celebrate(upd_SR),loginController.authenticateToken,serviceRequestController.Modify_SR,serviceRequestController.reschedule_SR);

//User Management
/**
 * @swagger
 * /get_all_users_ADS:
 *  get:
 *   summary: All users
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: users.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: users not found.
 *    500:
 *     description: internal server error.
 */
router.get('/get_all_users_ADS',loginController.authenticateToken,userManagementController.getAllUsers);

/**
 * @swagger
 * /change_user_status_ADS/{userId}:
 *  put:
 *   summary: All users
 *   description: users
 *   tags: 
 *    - Admin Screens 
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
 *       $ref: '#/definitions/Active'
 *   responses:
 *    200:
 *     description: user activated/inactivated successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: user account already active/inactive or user not found.
 *    422: 
 *     description: error in  activating/inactivating user.
 *    500:
 *     description: internal server error.
 */
router.put('/change_user_status_ADS/:userId',loginController.authenticateToken,userManagementController.changeUserStatus);

export = router;
