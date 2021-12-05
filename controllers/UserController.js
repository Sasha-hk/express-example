import UserService from '../services/UserService.js'


class UserController {
    async signUp(req, res, next) {
        try {
            const {email, password} = req.body

            const newUser = await UserService.registration(email, password)

            res.cookie('refreshToken', newUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.json(newUser)
        }
        catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController()
