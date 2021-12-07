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

    static EmailDoesNotExists() {
        return new AuthenticationError(400, 'User with this email does not exists')
    }

    static InvalidPassword() {
        return new AuthenticationError(400, 'Password is incorrect')
    }

    static BadRequest(message, errors = []) {
        return new AuthenticationError(400, message, errors);
    }
}