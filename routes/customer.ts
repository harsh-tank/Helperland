import express from "express";
import { celebrate } from "celebrate";

import { DashboardSchema } from "../Customer Pages/Dashboard/dashboard.model";
import { DashboardRepository } from "../Customer Pages/Dashboard/dashboard.repository";
import { DashboardService } from "../Customer Pages/Dashboard/dashboard.service";
import { DashboardController } from "../Customer Pages/Dashboard/dashboard.controller";

import { ServiceHistorySchema } from "../Customer Pages/Service History/servicehistory.model";
import { ServiceHistoryRepository } from "../Customer Pages/Service History/servicehistory.repository";
import { ServiceHistoryService } from "../Customer Pages/Service History/servicehistory.service";
import { ServiceHistoryController } from "../Customer Pages/Service History/servicehistory.controller";

import { MySettingsSchema } from "../Customer Pages/My Settings/mysettings.model";
import { MySettingsRepository } from "../Customer Pages/My Settings/mysettings.repository";
import { MySettingsService } from "../Customer Pages/My Settings/mysettings.service";
import { MySettingsController } from "../Customer Pages/My Settings/mysettings.controller";

import { FavoriteProviderSchema } from "../Customer Pages/Favourite Provider/favouriteprovider.model";
import { FavoriteProviderRepository } from "../Customer Pages/Favourite Provider/favouriteprovider.repository";
import { FavoriteProviderService } from "../Customer Pages/Favourite Provider/favouriteprovider.service";
import { FavoriteProviderController } from "../Customer Pages/Favourite Provider/favouriteprovider.controller";

import { LoginSchema } from '../Login/login.model';
import { LoginRepository } from '../Login/login.repository';
import { LoginService } from '../Login/login.service';
import { LoginController} from '../Login/login.controller';

const {  PrintDashboard, Reschedule_SR, Cancel_SR } = DashboardSchema;
const { Rate } = ServiceHistorySchema;
const {User_Update, Create_or_Update_Add, Reset_Pass} = MySettingsSchema;
const {Favor, Block} = FavoriteProviderSchema;


const dashboardRepository: DashboardRepository = new DashboardRepository();
const dashboardService: DashboardService = new DashboardService(dashboardRepository);
const dashboardController: DashboardController = new DashboardController(dashboardService);

const serviceHistoryRepository: ServiceHistoryRepository =new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(serviceHistoryRepository);
const serviceHistoryController: ServiceHistoryController =new ServiceHistoryController(serviceHistoryService);

const mySettingsRepository: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(mySettingsRepository);
const mySettingsController: MySettingsController = new MySettingsController(mySettingsService);

const favoriteProviderRepository: FavoriteProviderRepository = new FavoriteProviderRepository();
const favoriteProviderService: FavoriteProviderService = new FavoriteProviderService(favoriteProviderRepository);
const favoriteProviderController: FavoriteProviderController =new FavoriteProviderController(favoriteProviderService);

const loginRepository: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepository);
const loginController: LoginController = new LoginController(loginService);

const router: express.Router = express.Router();


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
router.get("/get_all_sr_dashboard",loginController.authenticateToken,dashboardController.getAllSRByUserId);

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
router.get("/get_sr_detail/:id",celebrate(PrintDashboard),loginController.authenticateToken,dashboardController.getSRDetailById);

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
router.post("/reschedule_Ser_Req/:serviceId",celebrate(Reschedule_SR),loginController.authenticateToken,dashboardController.Reschedule_Service_Check,dashboardController.Confirm_reschedule);

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
router.post("/Cancel_Ser_Req/:serviceId",celebrate(Cancel_SR),loginController.authenticateToken,dashboardController.cancel_Ser_Req);


//Service History's Routes
router.get("/get_SR_detail_by/:id",loginController.authenticateToken,serviceHistoryController.getSRDetailById);
router.get("/get_service-history_of_User",loginController.authenticateToken,serviceHistoryController.getSRHistoryOfUser);
router.get("/get_excel_sheet_format",loginController.authenticateToken,serviceHistoryController.Transfer_In_ExcelSheet);
router.post("/rate_SP/:serviceId",celebrate(Rate),loginController.authenticateToken,serviceHistoryController.rating_of_SP);

//My Settings's Routes
router.get("/get_user_add_by_id",loginController.authenticateToken,mySettingsController.get_User_AddById);
router.get("/get_user_add_by_add_id/:addressId",loginController.authenticateToken,mySettingsController.get_User_AddByAdd_Id);
router.put("/update_user_by_add_id/:addressId",celebrate(Create_or_Update_Add),loginController.authenticateToken,mySettingsController.update_User_AddByAdd_Id);
router.get("/get_detail_by_id_cust",loginController.authenticateToken,mySettingsController.get_User_DetailById);
router.put("/update_detail_by_id_cust",celebrate(User_Update),loginController.authenticateToken,mySettingsController.update_User_DetailById);
router.post("/create_user_add_cust",celebrate(Create_or_Update_Add),loginController.authenticateToken,mySettingsController.create_Add);
router.put("/del_user_add_cust/:addressId",loginController.authenticateToken,mySettingsController.delete_Add);
router.put("/reset_pass_user_cust",celebrate(Reset_Pass),loginController.authenticateToken,mySettingsController.change_Pass);

//Favorite And Blocked's routes
router.get("/get_cust_SP_Relation_cust",loginController.authenticateToken,favoriteProviderController.get_Provider_Cust_Relation);
router.post("/create_remove_fav_SP_cust/:helperId",celebrate(Favor),loginController.authenticateToken,favoriteProviderController.create_Favor_Provider,favoriteProviderController.Remove_Fav_Provider);
router.post("/create_remove_block_SP_cust/:helperId",celebrate(Block),loginController.authenticateToken,favoriteProviderController.block_Provier,favoriteProviderController.Removing_SP_From_Blocked_List);
export = router;