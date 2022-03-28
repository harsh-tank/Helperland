import express from 'express';
import { celebrate } from 'celebrate';

import { SubscribeUserRepository } from "../SubscribeUser/subscribeuser.repository";
import { SubscribeUserSchema } from "../SubscribeUser/subscribeuser.model";
import { SubscribeUserService } from "../SubscribeUser/subscribeuser.service";
import { SubscribeUserController } from "../SubscribeUser/subscribeuser.controller";

const { getSubscriber,addSubscriber } = SubscribeUserSchema;

const router: express.Router = express.Router();

const subscribeUserRepo:SubscribeUserRepository = new SubscribeUserRepository();
const subscribeUserService:SubscribeUserService = new SubscribeUserService(subscribeUserRepo);
const subscribeUserController:SubscribeUserController = new SubscribeUserController(subscribeUserService);

/**
 *@swagger
 * definitions:
 *  SubscribeUser:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email
 *     example: 'harshptank2212@gmail.com'
 */

 /**
 * @swagger
 * /create-Subscriber:
 *  post:
 *   summary: Subscribe to NewsLetter
 *   description: Enter email
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/SubscribeUser'
 *   responses:
 *    200:
 *     description: Subscription Email has been sent to you Email ID
 *    400:
 *     description: You are already a subscribed User
 *    500:
 *     description: something went wrong
 */

  router.post('/create-Subscriber', celebrate(addSubscriber),subscribeUserController.createSubscribeUser);
 
  router.post('/send-to-all', subscribeUserController.sendEmailToAllSubscribers);
  // get all subscriber
  router.get('/get-subscriber',subscribeUserController.getSubscribeUser);
  // get subscriber by id
  router.get('/get-subscriber/:id', celebrate(getSubscriber),subscribeUserController.getSubscribeUserById);

  export = router;