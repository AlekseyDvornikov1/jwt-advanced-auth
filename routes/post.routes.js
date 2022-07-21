import { Router } from "express";
import { postController } from "../controllers/post.controller.js";

const postRouter = new Router();

postRouter.get('/posts/', postController.getPosts);
postRouter.post('/posts/', postController.createPost);

export { postRouter };