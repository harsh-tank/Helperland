import express from 'express';
import { celebrate } from 'celebrate';

import {CustomerService} from '../Customer/customer.service';
import {CustomerController} from '../Customer/customer.controller';
import {CustomerRepository} from '../Customer/customer.repository';
import { CustomerSchema } from '../Customer/customer.model';

import { ProviderSchema } from '../Service Provider/provider.model';
import { ProviderService } from '../Service Provider/provider.service';
import { ProviderController } from '../Service Provider/provider.controller';
import { ProviderRepository } from '../Service Provider/provider.repository';

import { LoginSchema } from '../Login/login.model';
import { LoginRepository } from '../Login/login.repository';
import { LoginService } from '../Login/login.service';
import { LoginController} from '../Login/login.controller';

import { ForgotPasswordSchema } from '../Forgot Password/forgotpassword.model';
import { ForgotPasswordRepository } from '../Forgot Password/forgotpassword.repository';
import { ForgotPasswordService } from '../Forgot Password/forgotpassword.service';
import { ForgotPasswordController } from '../Forgot Password/forgotpassword.controller';

const {add} = CustomerSchema;
const {validate} = ProviderSchema;
const {Login} = LoginSchema;
const {Reset, changePassword} = ForgotPasswordSchema;

const router:express.Router = express.Router();

const customerRepo:CustomerRepository = new CustomerRepository();
const customerService:CustomerService = new CustomerService(customerRepo);
const customerController:CustomerController = new CustomerController(customerService);

const providerRepo:ProviderRepository = new ProviderRepository();
const providerService:ProviderService = new ProviderService(providerRepo);
const providerController:ProviderController = new ProviderController(providerService);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const forgotPassRepo:ForgotPasswordRepository = new ForgotPasswordRepository();
const forgotPassService:ForgotPasswordService = new ForgotPasswordService(forgotPassRepo);
const forgotPassController:ForgotPasswordController = new ForgotPasswordController(forgotPassService);

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
router.post('/customerRegistration', celebrate(add), customerController.createCustomer);

//Service Provider Routes

/**
 * @swagger
 * /providerRegisteration:
 *  post:
 *   summary: Become Service Provider
 *   description: Registration of Service Provider
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
router.post('/providerRegisteration', celebrate(validate),providerController.createProvider);

//Login Routes

/**
 * @swagger
 * /userlogin:
 *  post:
 *   summary: User Login
 *   description: Login Check
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
router.post('/userlogin',celebrate(Login),loginController.confirmLogin);
router.post('/token_validation',loginController.authenticateToken);
//Forgot Password Routes

/**
 * @swagger
 * /forgot-password:
 *  post:
 *   summary: Forgot Password
 *   description: Enter email
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
router.post('/forgot-password', celebrate(Reset),forgotPassController.forgotPassword);

/**
 * @swagger
 * /reset-password:
 *  post:
 *   summary: Reset Password
 *   description: Enter updated password
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
router.post('/reset-password',celebrate(changePassword),forgotPassController.resetPassword);

export = router;