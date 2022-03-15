"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const subscribeuser_repository_1 = require("../SubscribeUser/subscribeuser.repository");
const subscribeuser_model_1 = require("../SubscribeUser/subscribeuser.model");
const subscribeuser_service_1 = require("../SubscribeUser/subscribeuser.service");
const subscribeuser_controller_1 = require("../SubscribeUser/subscribeuser.controller");
const { getSubscriber, addSubscriber } = subscribeuser_model_1.SubscribeUserSchema;
const router = express_1.default.Router();
const subscribeUserRepo = new subscribeuser_repository_1.SubscribeUserRepository();
const subscribeUserService = new subscribeuser_service_1.SubscribeUserService(subscribeUserRepo);
const subscribeUserController = new subscribeuser_controller_1.SubscribeUserController(subscribeUserService);
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
router.post('/create-Subscriber', (0, celebrate_1.celebrate)(addSubscriber), subscribeUserController.createSubscribeUser);
router.post('/send-to-all', subscribeUserController.sendEmailToAllSubscribers);
// get all subscriber
router.get('/get-subscriber', subscribeUserController.getSubscribeUser);
// get subscriber by id
router.get('/get-subscriber/:id', (0, celebrate_1.celebrate)(getSubscriber), subscribeUserController.getSubscribeUserById);
module.exports = router;
