"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const customer_service_1 = require("../Customer/customer.service");
const customer_controller_1 = require("../Customer/customer.controller");
const customer_repository_1 = require("../Customer/customer.repository");
const customer_model_1 = require("../Customer/customer.model");
const provider_model_1 = require("../Service Provider/provider.model");
const provider_service_1 = require("../Service Provider/provider.service");
const provider_controller_1 = require("../Service Provider/provider.controller");
const provider_repository_1 = require("../Service Provider/provider.repository");
const login_model_1 = require("../Login/login.model");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const forgotpassword_model_1 = require("../Forgot Password/forgotpassword.model");
const forgotpassword_repository_1 = require("../Forgot Password/forgotpassword.repository");
const forgotpassword_service_1 = require("../Forgot Password/forgotpassword.service");
const forgotpassword_controller_1 = require("../Forgot Password/forgotpassword.controller");
const { add } = customer_model_1.CustomerSchema;
const { validate } = provider_model_1.ProviderSchema;
const { Login } = login_model_1.LoginSchema;
const { Reset, changePassword } = forgotpassword_model_1.ForgotPasswordSchema;
const router = express_1.default.Router();
const customerRepo = new customer_repository_1.CustomerRepository();
const customerService = new customer_service_1.CustomerService(customerRepo);
const customerController = new customer_controller_1.CustomerController(customerService);
const providerRepo = new provider_repository_1.ProviderRepository();
const providerService = new provider_service_1.ProviderService(providerRepo);
const providerController = new provider_controller_1.ProviderController(providerService);
const loginRepo = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepo);
const loginController = new login_controller_1.LoginController(loginService);
const forgotPassRepo = new forgotpassword_repository_1.ForgotPasswordRepository();
const forgotPassService = new forgotpassword_service_1.ForgotPasswordService(forgotPassRepo);
const forgotPassController = new forgotpassword_controller_1.ForgotPasswordController(forgotPassService);
/**
 *@swagger
 * definitions:
 *  User:
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
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'harshptank2212@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *     example: '123454321'
 *    Confirm_Password:
 *     type: string
 *     description: confirm password
 *     example: '123454321'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: '1234567890'
 *  Login:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'harshptank2212@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *  Reset:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'harshptank2212@gmail.com'
 *  changePassword:
 *   type: object
 *   properties:
 *    resetLink:
 *     type: string
 *     description: reset link
 *    changedPassword:
 *     type: string
 *     description: new password of user
 */
//Customer Routes
/**
 * @swagger
 * /customerRegistration:
 *  post:
 *   summary: Customer Sign-up
 *   description: user registration
 *   tags:
 *    - Login & SignUp API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, check spam folder.
 *    400:
 *     description: password does not match OR email or mobile number already Present.
 *    500:
 *     description: Error in registration.
 */
router.post('/customerRegistration', (0, celebrate_1.celebrate)(add), customerController.createCustomer);
//Service Provider Routes
/**
 * @swagger
 * /providerRegisteration:
 *  post:
 *   summary: Become Service Provider
 *   description: Registration of Service Provider
 *   tags:
 *    - Login & SignUp API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, check spam folder.
 *    400:
 *     description: password does not match OR email or mobile number already Present.
 *    500:
 *     description: Error in registration.
 */
router.post('/providerRegisteration', (0, celebrate_1.celebrate)(validate), providerController.createProvider);
//Login Routes
/**
 * @swagger
 * /userlogin:
 *  post:
 *   summary: User Login
 *   description: Login Check
 *   tags:
 *    - Login & SignUp API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Login'
 *   responses:
 *    200:
 *     description: Login successful.
 *    401:
 *     description: invalid username or password.
 *    500:
 *     description: Error.
 */
router.post('/userlogin', (0, celebrate_1.celebrate)(Login), loginController.confirmLogin);
router.post('/token_validation', loginController.authenticateToken);
//Forgot Password Routes
/**
 * @swagger
 * /forgot-password:
 *  post:
 *   summary: Forgot Password
 *   description: Enter email
 *   tags:
 *    - Login & SignUp API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reset'
 *   responses:
 *    200:
 *     description: Email successfully sent,Check Spam.
 *    400:
 *     description: User does not exist.
 *    500:
 *     description: Error.
 */
router.post('/forgot-password', (0, celebrate_1.celebrate)(Reset), forgotPassController.forgotPassword);
/**
 * @swagger
 * /reset-password:
 *  post:
 *   summary: Reset Password
 *   description: Enter updated password
 *   tags:
 *    - Login & SignUp API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/changePassword'
 *   responses:
 *    200:
 *     description: Password successfully changed.
 *    401:
 *     description: Incorrect or expired token.
 *    400:
 *     description: You used the same password. Choose different password.
 *    500:
 *     description: Error.
 */
router.post('/reset-password', (0, celebrate_1.celebrate)(changePassword), forgotPassController.resetPassword);
module.exports = router;
