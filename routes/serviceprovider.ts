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

//New Service Request's Routes
router.get("/get_all_new_sr_sp",loginController.authenticateToken,serviceRequestController.getAllNewSR);
router.get("/accept_new_sr_sp/:requestId",loginController.authenticateToken,serviceRequestController.IsSRAcceptable,serviceRequestController.acceptNewSR);
router.get("/get_sr_detail_by_id_sp/:requestId",loginController.authenticateToken,serviceRequestController.getServiceRequestById);

//Upcoming Services Routes
router.get("/get_all_upcoming_sr_sp",loginController.authenticateToken,upcomingServiceController.getAllUpcomingSR);
router.put("/cancel_sr_sp/:requestId",loginController.authenticateToken,upcomingServiceController.cancelSR);
router.put("/complete_sr_sp/:requestId",loginController.authenticateToken,upcomingServiceController.completeSR);
router.get("/get_service_detail_sp/:id",loginController.authenticateToken,upcomingServiceController.getServiceRequestDetailById);

//Service History Routes
router.get("/get_sr_detail_by_id_sp/:id",loginController.authenticateToken,serviceHistoryController.getSRDetailById);
router.get("/get_all_completed_sr_sp",loginController.authenticateToken,serviceHistoryController.getAllCompletedSR);
router.get("/get_history_in_excel_sp",loginController.authenticateToken,serviceHistoryController.Transfer_In_ExcelSheet);
router.get("/get_rating_of_sp",loginController.authenticateToken,serviceHistoryController.PrintRatingsofSP);

//Block Customer Routes
router.get("/get_all_completed_sr_bc",loginController.authenticateToken,blockCustomerController.getCompletedSRofProvider);
router.put("/cust_bl_un_bc/:userId",celebrate(Cust_Block),loginController.authenticateToken,blockCustomerController.Cust_BlockList,blockCustomerController.Cust_UnBlockList);

//My Settings
router.get("/get_user_detail_by_Id_MS",loginController.authenticateToken,mySettingsController.get_User_Detail_ById);
router.put("/Upd_details_MS",celebrate(Upd_User),loginController.authenticateToken,mySettingsController.update_User_DetailById,mySettingsController.Create_Or_Upd_Add);
router.put("/Reset_Pass_MS",celebrate(Reset_Pass),loginController.authenticateToken,mySettingsController.change_Pass);

export = router;