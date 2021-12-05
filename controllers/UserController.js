import UserService from '../services/UserService.js'


class UserController {
    async signUp(req, res, next) {
        try {
            const {email, password} = req.body

            const newUser = await UserService.registration(email, password)

            console.log(newUser)

            res.json(newUser)
        }
        catch (e) {
            next(e)
        }
    }
}

export default new UserController()
