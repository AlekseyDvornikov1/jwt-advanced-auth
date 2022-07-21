export class ApiExeption extends Error {
    constructor(status, message, erros = []){
        super();
        this.status = status;
        this.message = message;
        this.errors = erros;
    }

    static UnauthorizedError() {
        return new ApiExeption(401, 'User not authorized');
    }

    static BadRequest(message, errors = []) {
        return new ApiExeption(400, message, errors);
    }
}