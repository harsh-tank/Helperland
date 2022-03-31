"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const servicerequests_model_1 = require("../Admin Screen/Service Requests/servicerequests.model");
const servicerequests_repository_1 = require("../Admin Screen/Service Requests/servicerequests.repository");
const servicerequests_service_1 = require("../Admin Screen/Service Requests/servicerequests.service");
const servicerequests_controller_1 = require("../Admin Screen/Service Requests/servicerequests.controller");
const usermanagement_repository_1 = require("../Admin Screen/User Management/usermanagement.repository");
const usermanagement_service_1 = require("../Admin Screen/User Management/usermanagement.service");
const usermanagement_controller_1 = require("../Admin Screen/User Management/usermanagement.controller");
const { upd_SR } = servicerequests_model_1.SR_Schema;
const router = express_1.default.Router();
const serviceRequestRepository = new servicerequests_repository_1.ServiceRequestsRepository();
const serviceRequestService = new servicerequests_service_1.ServiceRequestsService(serviceRequestRepository);
const serviceRequestController = new servicerequests_controller_1.ServiceRequestsController(serviceRequestService);
const userManagementRepository = new usermanagement_repository_1.UserManagementRepository();
const userManagementService = new usermanagement_service_1.UserManagementService(userManagementRepository);
const userManagementController = new usermanagement_controller_1.UserManagementController(userManagementService);
const loginRepository = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepository);
const loginController = new login_controller_1.LoginController(loginService);
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
 *  ReturnRefund:
 *   type: object
 *   properties:
 *    ServiceRequestId:
 *     type: integer
 *     description: service request id
 *     example: 9
 *    PaidAmount:
 *     type: integer
 *     description: service request id
 *     example: 74
 *    RefundedAmount:
 *     type: integer
 *     description: service request id
 *     example: 40
 *    Comment:
 *     type: string
 *     description: notes
 *     example: 'comment'
 *    Notes:
 *     type: string
 *     description: notes
 *     example: 'notes'
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
router.get('/get-all_SR_ADS', loginController.authenticateToken, serviceRequestController.getAllSR);
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
router.post('/filter-feature_SR_ADS', loginController.authenticateToken, serviceRequestController.filter_feature_SR);
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
router.get('/cancel-SR_ADS/:requestId', loginController.authenticateToken, serviceRequestController.cancelSR);
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
router.post('/SR_edit_Reschedule_ADS', (0, celebrate_1.celebrate)(upd_SR), loginController.authenticateToken, serviceRequestController.Modify_SR, serviceRequestController.reschedule_SR);
/**
 * @swagger
 * /return-refund_ADS:
 *  post:
 *   summary: Return Refund
 *   description: Return Refund
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
 *       $ref: '#/definitions/ReturnRefund'
 *   responses:
 *    200:
 *     description: service request refunded successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token / refund amount must be less than paid amount.
 *    404:
 *     description: service request not found or service request not completed.
 *    422:
 *     description: amount not refunded.
 *    500:
 *     description: internal server error.
 */
router.post('/return-refund_ADS', loginController.authenticateToken, serviceRequestController.Return_refund);
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
router.get('/get_all_users_ADS', loginController.authenticateToken, userManagementController.getAllUsers);
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
router.put('/change_user_status_ADS/:userId', loginController.authenticateToken, userManagementController.changeUserStatus);
module.exports = router;
