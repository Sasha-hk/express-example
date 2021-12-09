import AuthenticationError from '../exceptions/AuthenticationError.js'
import TokenService from '../services/token-service.js'

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


export default checkAuthentication
