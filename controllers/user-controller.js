import UserService from '../services/user-service.js'
import AuthenticationError from '../exceptions/AuthenticationError.js'


class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body 

            const userData = await UserService.registration(email, password) 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async logIn(req, res, next) {
        try {
            const {email, password} = req.body 
            const userData = await UserService.logIn(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(userData) 
        }
        catch (e) {
            next(e)
        }
    }

    async logOut(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logOut(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token.rows);
        }
        catch (e) {
            next(e)
        }
    }

    // async refresh(req, res, next) {
    //     try {
    //         const {refreshToken} = req.cookies            
    //         const userData = await UserService.refresh(refreshToken)
    //         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
    //         res.json(userData)
    //     }
    //     catch (e) {
    //         next(e)
    //     }
    // }

    // async getUsers(req, res, next) {
    //     const users = await UserModel.find()
    //     res.json(users)
    // }
}


export default new UserController()
