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
//New Service Request's Routes
router.get("/get_all_new_sr_sp", loginController.authenticateToken, serviceRequestController.getAllNewSR);
router.get("/accept_new_sr_sp/:requestId", loginController.authenticateToken, serviceRequestController.IsSRAcceptable, serviceRequestController.acceptNewSR);
router.get("/get_sr_detail_by_id_sp/:requestId", loginController.authenticateToken, serviceRequestController.getServiceRequestById);
//Upcoming Services Routes
router.get("/get_all_upcoming_sr_sp", loginController.authenticateToken, upcomingServiceController.getAllUpcomingSR);
router.put("/cancel_sr_sp/:requestId", loginController.authenticateToken, upcomingServiceController.cancelSR);
router.put("/complete_sr_sp/:requestId", loginController.authenticateToken, upcomingServiceController.completeSR);
router.get("/get_service_detail_sp/:id", loginController.authenticateToken, upcomingServiceController.getServiceRequestDetailById);
//Service History Routes
router.get("/get_sr_detail_by_id_sp/:id", loginController.authenticateToken, serviceHistoryController.getSRDetailById);
router.get("/get_all_completed_sr_sp", loginController.authenticateToken, serviceHistoryController.getAllCompletedSR);
router.get("/get_history_in_excel_sp", loginController.authenticateToken, serviceHistoryController.Transfer_In_ExcelSheet);
router.get("/get_rating_of_sp", loginController.authenticateToken, serviceHistoryController.PrintRatingsofSP);
//Block Customer Routes
router.get("/get_all_completed_sr_bc", loginController.authenticateToken, blockCustomerController.getCompletedSRofProvider);
router.put("/cust_bl_un_bc/:userId", (0, celebrate_1.celebrate)(Cust_Block), loginController.authenticateToken, blockCustomerController.Cust_BlockList, blockCustomerController.Cust_UnBlockList);
//My Settings
router.get("/get_user_detail_by_Id_MS", loginController.authenticateToken, mySettingsController.get_User_Detail_ById);
router.put("/Upd_details_MS", (0, celebrate_1.celebrate)(Upd_User), loginController.authenticateToken, mySettingsController.update_User_DetailById, mySettingsController.Create_Or_Upd_Add);
router.put("/Reset_Pass_MS", (0, celebrate_1.celebrate)(Reset_Pass), loginController.authenticateToken, mySettingsController.change_Pass);
module.exports = router;
