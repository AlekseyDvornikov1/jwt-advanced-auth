import { ApiExeption } from "../exeptions/api.exeption.js";

export const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiExeption) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unexpected error' });
}