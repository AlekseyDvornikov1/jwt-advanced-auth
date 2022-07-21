import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authRouter } from "./auth.routes.js";

const userRouter = new Router();

userRouter.get('/users/', authMiddleware, userController.getUsers);
userRouter.get('/users/:id', authMiddleware, userController.getUser);
userRouter.post('/users', authMiddleware, userController.createUser);
userRouter.put('/users/:id', authMiddleware, userController.updateUser);
userRouter.delete('/users/:id', authMiddleware, userController.deleteUser);
userRouter.get('/user/activate/:link', userController.activate);

userRouter.use('/user/', authRouter);

export { userRouter };