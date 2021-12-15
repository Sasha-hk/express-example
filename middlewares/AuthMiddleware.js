const AuthenticationError = require('../exceptions/AuthenticationError')
const TokenService = require('../services/token-service')

function checkAuthentication(req, res, next) {
    try {
        const accessToken = req.body.accessToken
        if (!accessToken) {
            return next(AuthenticationError.AuthorizedError())
        }
        
        const validatedToken = TokenService.validateAccessToken(accessToken) 
        
        if (!validatedToken) {
            return next(AuthenticationError.AuthorizedError())
        }

        req.user = validatedToken

        next() 
    }
    catch(e) {
        return next(AuthenticationError.AuthorizedError())
    }
}


module.exports = checkAuthentication
