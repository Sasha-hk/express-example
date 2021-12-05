import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'


class UserController {
    async signUp(req, res, next) {
        try {
            const {email, password} = req.body
            const userCandedat = await UserModel.findOne({email})

            if (userCandedat) {
                res.status(400).json('User with whis email allready exists')
            }

            const newUser = UserModel({
                email, 
                password: await bcrypt.hash(password, 3),
                activationLink: v4()
            })

            newUser.save()

            res.json(newUser)
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default new UserController()
