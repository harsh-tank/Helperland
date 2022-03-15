"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const dashboard_model_1 = require("../Customer Pages/Dashboard/dashboard.model");
const dashboard_repository_1 = require("../Customer Pages/Dashboard/dashboard.repository");
const dashboard_service_1 = require("../Customer Pages/Dashboard/dashboard.service");
const dashboard_controller_1 = require("../Customer Pages/Dashboard/dashboard.controller");
const servicehistory_model_1 = require("../Customer Pages/Service History/servicehistory.model");
const servicehistory_repository_1 = require("../Customer Pages/Service History/servicehistory.repository");
const servicehistory_service_1 = require("../Customer Pages/Service History/servicehistory.service");
const servicehistory_controller_1 = require("../Customer Pages/Service History/servicehistory.controller");
const mysettings_model_1 = require("../Customer Pages/My Settings/mysettings.model");
const mysettings_repository_1 = require("../Customer Pages/My Settings/mysettings.repository");
const mysettings_service_1 = require("../Customer Pages/My Settings/mysettings.service");
const mysettings_controller_1 = require("../Customer Pages/My Settings/mysettings.controller");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const { PrintDashboard, Reschedule_SR, Cancel_SR } = dashboard_model_1.DashboardSchema;
const { Rate } = servicehistory_model_1.ServiceHistorySchema;
const { User_Update, Create_or_Update_Add, Reset_Pass } = mysettings_model_1.MySettingsSchema;
const dashboardRepository = new dashboard_repository_1.DashboardRepository();
const dashboardService = new dashboard_service_1.DashboardService(dashboardRepository);
const dashboardController = new dashboard_controller_1.DashboardController(dashboardService);
const serviceHistoryRepository = new servicehistory_repository_1.ServiceHistoryRepository();
const serviceHistoryService = new servicehistory_service_1.ServiceHistoryService(serviceHistoryRepository);
const serviceHistoryController = new servicehistory_controller_1.ServiceHistoryController(serviceHistoryService);
const mySettingsRepository = new mysettings_repository_1.MySettingsRepository();
const mySettingsService = new mysettings_service_1.MySettingsService(mySettingsRepository);
const mySettingsController = new mysettings_controller_1.MySettingsController(mySettingsService);
const loginRepository = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepository);
const loginController = new login_controller_1.LoginController(loginService);
const router = express_1.default.Router();
/**
 * @swagger
 * /get_all_sr_dashboard:
 *  get:
 *   summary: Get requests by user
 *   description: User dashboard of its Service Request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: requests found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no pending service request found / no service request found for this user.
 *    500:
 *     description: internal server error.
 */
router.get("/get_all_sr_dashboard", loginController.authenticateToken, dashboardController.getAllSRByUserId);
/**
 * @swagger
 * /get_sr_detail/{id}:
 *  get:
 *   summary: Get request detail
 *   description: Request detail by id
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: request detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 */
router.get("/get_sr_detail/:id", (0, celebrate_1.celebrate)(PrintDashboard), loginController.authenticateToken, dashboardController.getSRDetailById);
/**
 * @swagger
 * /reschedule_Ser_Req/{serviceId}:
 *  post:
 *   summary: Reschedule Service Request
 *   description: Enter date and time to Re-Schedule
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: serviceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RescheduleService'
 *   responses:
 *    200:
 *     description: sevice request reschedule successfully.
 *    400:
 *     description: enter future date for reschedule service request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: service request not found or No data found / service request id not found.
 *    422:
 *     description: error in rescheduling service request.
 *    500:
 *     description: failure in finding service provider.
 *
 */
router.post("/reschedule_Ser_Req/:serviceId", (0, celebrate_1.celebrate)(Reschedule_SR), loginController.authenticateToken, dashboardController.Reschedule_Service_Check, dashboardController.Confirm_reschedule);
/**
 * @swagger
 * /Cancel_Ser_Req/{serviceId}:
 *  post:
 *   summary: Cancel Service request
 *   description: feedback
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: srId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CancelService'
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    201:
 *     description: service request already canceled.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found.
 *    422:
 *     description: error in canceling service request.
 *    500:
 *     description: internal server error.
 *
 */
router.post("/Cancel_Ser_Req/:serviceId", (0, celebrate_1.celebrate)(Cancel_SR), loginController.authenticateToken, dashboardController.cancel_Ser_Req);
//Service History's Routes
router.get("/get_SR_detail_by/:id", loginController.authenticateToken, serviceHistoryController.getSRDetailById);
router.get("/get_service-history_of_User", loginController.authenticateToken, serviceHistoryController.getSRHistoryOfUser);
router.get("/get_excel_sheet_format", loginController.authenticateToken, serviceHistoryController.Transfer_In_ExcelSheet);
router.post("/rate_SP/:serviceId", (0, celebrate_1.celebrate)(Rate), loginController.authenticateToken, serviceHistoryController.rating_of_SP);
//My Settings's Routes
router.get("/get_user_add_by_id", loginController.authenticateToken, mySettingsController.get_User_AddById);
router.get("/get_user_add_by_add_id/:addressId", loginController.authenticateToken, mySettingsController.get_User_AddByAdd_Id);
router.put("/update_user_by_add_id/:addressId", (0, celebrate_1.celebrate)(Create_or_Update_Add), loginController.authenticateToken, mySettingsController.update_User_AddByAdd_Id);
router.get("/get_detail_by_id", loginController.authenticateToken, mySettingsController.get_User_DetailById);
router.put("/update_detail_by_id", (0, celebrate_1.celebrate)(User_Update), loginController.authenticateToken, mySettingsController.update_User_DetailById);
router.post("/create_user_add", (0, celebrate_1.celebrate)(Create_or_Update_Add), loginController.authenticateToken, mySettingsController.create_Add);
router.put("/del_user_add/:addressId", loginController.authenticateToken, mySettingsController.delete_Add);
router.put("/reset_pass_user", (0, celebrate_1.celebrate)(Reset_Pass), loginController.authenticateToken, mySettingsController.change_Pass);
module.exports = router;
