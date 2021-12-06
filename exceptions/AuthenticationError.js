export default class AuthenticationError extends Error {
    status 
    error 

    constructor(status, message, errors = []) {
        super(message)
        this.status = status 
        this.error = errors
    }

    static EmailExists() {
        return AuthnticationError(400, 'User with whis email already exists')
    }
}