export default class UserError extends Error {
    status 
    error 

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new UserError(400, message, errors);
    }
}