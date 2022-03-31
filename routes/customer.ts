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
 *@swagger
 * definitions:
 *  RescheduleService:
 *   type: object
 *   properties:
 *    date:
 *     type: string
 *     description: date
 *     example: "01-01-2022"
 *    time:
 *     type: string
 *     description: time
 *     example: "10:00"
 *  CancelService:
 *   type: object
 *   properties:
 *    comment:
 *     type: string
 *     description: comment
 *     example: "XYZ"
 *  Ratings:
 *   type: object
 *   properties:
 *    Comments:
 *     type: string
 *     description: date
 *     example: "01-01-2022"
 *    OnTimeArrival:
 *     type: float
 *     description: rating
 *     example: 4.5
 *    Friendly:
 *     type: float
 *     description: rating
 *     example: 4.5
 *    QualityOfService:
 *     type: float
 *     description: rating
 *     example: 4.5
 *  Favorite:
 *   type: object
 *   properties:
 *    IsFavorite:
 *     type: boolean
 *     example: 'true'
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
 *     example: "0123456789"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "10-10-2010"
 *    LanguageId:
 *     type: integer
 *     description: language 
 *     example: 1
 *  UpdateCreateAddress:
 *     type: object
 *     properties:
 *      StreetName:
 *       type: string
 *       description: address
 *       example: 'XYZ'
 *      HouseNumber:
 *       type: string
 *       description: house number
 *       example: '007'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '380005'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: "1234567890"
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


/**
 * @swagger
 * /get_all_sr_dashboard:
 *  get:
 *   summary: Get requests by user
 *   description: User dashboard of its Service Request
 *   tags: 
 *    - Customer's pages
 *   parameters:
 *    - in: header
 *      name: x-auth
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
 *   tags: 
 *    - Customer's pages
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
 *   tags: 
 *    - Customer's pages
 *   parameters:
 *    - in: header
 *      name: x-auth
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
 *   tags: 
 *    - Customer's pages
 *   parameters:
 *    - in: header
 *      name: x-auth
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
/**
 * @swagger
 * /get_SR_detail_by/{id}:
 *  get:
 *   summary: Service request detail
 *   description: users completed or cancelled service request detail
 *   tags: 
 *    - Customer’s pages
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
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No service request detail found for this request.
 *    500:
 *     description: internal server error.
 */
router.get("/get_SR_detail_by/:id",loginController.authenticateToken,serviceHistoryController.getSRDetailById);

/**
 * @swagger
 * /get_service-history_of_User:
 *  get:
 *   summary: User history
 *   description: history of users service request
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: history found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past.
 *    500:
 *     description: internal server error.
 */
router.get("/get_service-history_of_User",loginController.authenticateToken,serviceHistoryController.getSRHistoryOfUser);
/**
 * @swagger
 * /get_excel_sheet_format:
 *  get:
 *   summary: Excel Sheet Download
 *   description: download history
 *   tags: 
 *    - Customer’s pages 
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

router.get("/get_excel_sheet_format",loginController.authenticateToken,serviceHistoryController.Transfer_In_ExcelSheet);

/**
 * @swagger
 * /rate_SP/{serviceId}:
 *  post:
 *   summary: Ratings
 *   description: rete service provider
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
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
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success.
 *    201:
 *     description: ratings already set for this service request.
 *    400:
 *     description: service request not completed or service provider not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found / srvice request not found / request id not found.
 *    500:
 *     description: internal server error.
 * 
 */

router.post("/rate_SP/:serviceId",celebrate(Rate),loginController.authenticateToken,serviceHistoryController.rating_of_SP);

//My Settings's Routes
/**
 * @swagger
 * /get_user_add_by_id:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: addresses found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found for this user.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */
router.get("/get_user_add_by_id",loginController.authenticateToken,mySettingsController.get_User_AddById);

/**
 * @swagger
 * /get_user_add_by_add_id/{addressId}:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

router.get("/get_user_add_by_add_id/:addressId",loginController.authenticateToken,mySettingsController.get_User_AddByAdd_Id);

/**
 * @swagger
 * /update_user_by_add_id/{addressId}:
 *  put:
 *   summary: Update address
 *   description: Change detail to update address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    201:
 *     description: address updated successfully.
 *    400:
 *     description: invalid input.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: error while updating information.
 *    422:
 *     description: error while updating information.
 *    500:
 *     description: No service provider found.
 * 
 */
router.put("/update_user_by_add_id/:addressId",celebrate(Create_or_Update_Add),loginController.authenticateToken,mySettingsController.update_User_AddByAdd_Id);
/**
 * @swagger
 * /get_detail_by_id_cust:
 *  get:
 *   summary: User detail
 *   description: Display user details.
 *   tags: 
 *    - Customer’s pages
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
router.get("/get_detail_by_id_cust",loginController.authenticateToken,mySettingsController.get_User_DetailById);

/**
 * @swagger
 * /update_detail_by_id_cust:
 *  put:
 *   summary: Update User detail
 *   description: edit user details to update.
 *   tags: 
 *    - Customer’s pages
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
 *     description: detail updated.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */
router.put("/update_detail_by_id_cust",celebrate(User_Update),loginController.authenticateToken,mySettingsController.update_User_DetailById);

/**
 * @swagger
 * /create_user_add_cust:
 *  post:
 *   summary: Create address
 *   description: add new address
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    200:
 *     description: address created successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    422:
 *     description: error in creating address.
 *    500:
 *     description: internal server error.
 * 
 */
router.post("/create_user_add_cust",celebrate(Create_or_Update_Add),loginController.authenticateToken,mySettingsController.create_Add);

/**
 * @swagger
 * /del_user_add_cust/{addressId}:
 *  put:
 *   summary: Delete address
 *   description: remove address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address deleted successfully.
 *    400:
 *     description: Invalid Input.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error while deleting address.
 *    500:
 *     description: internal server error.
 * 
 */
router.put("/del_user_add_cust/:addressId",loginController.authenticateToken,mySettingsController.delete_Add);

/**
 * @swagger
 * /reset_pass_user_cust:
 *  put:
 *   summary: Reset password
 *   description: enter old password and new password.
 *   tags: 
 *    - Customer’s pages
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
 *     description: Incorrect old password or new Password and Confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error while changing password.
 *    500:
 *     description: internal server error.
 * 
 */
router.put("/reset_pass_user_cust",celebrate(Reset_Pass),loginController.authenticateToken,mySettingsController.change_Pass);

//Favorite And Blocked's routes
/**
 * @swagger
 * /get_cust_SP_Relation_cust:
 *  get:
 *   summary: Favorite SP
 *   description: SP worked with customer in past
 *   tags: 
 *    - Customer's pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: SP found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past.
 *    500:
 *     description: internal server error.
 */
router.get("/get_cust_SP_Relation_cust",loginController.authenticateToken,favoriteProviderController.get_Provider_Cust_Relation);
/**
 * @swagger
 * /create_remove_fav_SP_cust/{helperId}:
 *  post:
 *   summary: Favorite SP
 *   description: Add or remove favorite SP
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Favorite'
 *   responses:
 *    200:
 *     description: favorite helper created successfully.
 *    201:
 *     description: favorite helper updated successfully.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you favorite list
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in creating favorite helper / error in creating favorite helper.
 * 
 */

router.post("/create_remove_fav_SP_cust/:helperId",celebrate(Favor),loginController.authenticateToken,favoriteProviderController.create_Favor_Provider,favoriteProviderController.Remove_Fav_Provider);

/**
 * @swagger
 * /create_remove_block_SP_cust/{helperId}:
 *  post:
 *   summary: Block SP
 *   description: Add or remove block SP
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: x-auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: blocked helper created successfully / helper removed from blocked list.
 *    201:
 *     description: helper added in blocked list.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you blocked/unblocked list.
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in adding / removing helper in blocked list or error in creating     blocked helper.
 * 
 */
router.post("/create_remove_block_SP_cust/:helperId",celebrate(Block),loginController.authenticateToken,favoriteProviderController.block_Provier,favoriteProviderController.Removing_SP_From_Blocked_List);
export = router;