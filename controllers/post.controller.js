import { Post } from './../models/post.model.js';

class PostController {

    async getPosts(req, res, next) {
        try {
            let posts = await Post.find();
            res.json(posts);
        } catch (e) {
            next(e);
        }

    };

    async createPost(req, res, next) {
        try {
            let post = await Post.create(req.body);
            res.json(post);
        } catch (e) {
            next(e);
        }

    };



}

export const postController = new PostController();