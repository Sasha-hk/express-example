import UserModel from '../models/UserModel.js'
import TokenService from './TokenService.js'
import UserDto from '../dtos/UserDto.js'
import UserError from '../exceptions/userError.js'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'


class UserService {
    async registration(email, password) {
        const userCandedat = await UserModel.findOne({email})

        if (userCandedat) {
            throw UserError.BadRequest(`User with this email: ${email}, allrady exists`)
        }

        const newUser = await UserModel.create({
            email, 
            password: await bcrypt.hash(password, 3),
            activationLink: v4()
        })

        const userDto = new UserDto(newUser)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}


export default new UserService()
