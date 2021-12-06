export default class AuthenticationError extends Error {
    status 
    error 

    constructor(status, message, errors = []) {
        super(message)
        this.status = status 
        this.error = errors
    }

    static EmailExists() {
        return new AuthenticationError(400, 'User with whis email already exists')
    }

    static BadRequest(message, errors = []) {
        return new AuthenticationError(400, message, errors);
    }
}