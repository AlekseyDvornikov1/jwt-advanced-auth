import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { body } from "express-validator";
const authRouter = new Router();

authRouter.post('/registration/', body('email').isEmail(), body('password').isLength({ min: 3, max: 16 }), authController.registration);
authRouter.post('/login/', authController.login);
authRouter.post('/logout/', authController.logout);
authRouter.get('/refresh/', authController.registration);

 

export { authRouter };