import express from 'express';
import { celebrate } from 'celebrate';

import { LoginController } from "../Login/login.controller";
import { LoginSchema } from "../Login/login.model";
import { LoginRepository } from "../Login/login.repository";
import { LoginService } from "../Login/login.service";

import { BookServiceRepository } from "../Book_Service/bookservice.repository";
import { BookServiceController } from "../Book_Service/bookservice.controller";
import { BookService } from "../Book_Service/bookservice.service";
import { BookServiceSchema } from "../Book_Service/bookservice.model";

const router: express.Router = express.Router();

const loginRepository:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepository);
const loginController:LoginController = new LoginController(loginService)

const bookRepository: BookServiceRepository = new BookServiceRepository();
const bookService: BookService= new BookService(bookRepository);
const bookController: BookServiceController = new BookServiceController(bookService);

const { zipcode_match, U_Add, Create_Ser} = BookServiceSchema;

router.post('/confirm-zipcode',celebrate(zipcode_match),loginController.authenticateToken,bookController.confirmServiceAvailable);

router.post('/create-ser_request', celebrate(Create_Ser),loginController.authenticateToken,bookController.decodeToken, bookController.CreateServiceRequest);



router.post('/user-address', celebrate(U_Add),loginController.authenticateToken,bookController.createUserAddress);

router.get('/user-addresses', loginController.authenticateToken,bookController.getUserAddresses);

router.post('/create-favorite-blocked', loginController.authenticateToken,bookController.createFavoriteAndBlocked);

router.get('/create-favorite-blocked', loginController.authenticateToken,bookController.getFavoriteAndBlocked);

export = router;
