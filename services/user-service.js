import UserModel from '../models/UserModel.js'
import UserDto from '../dtos/userDto.js'
import TokenService from './token-service.js'
import AuthenticationError from '../exceptions/AuthenticationError.js'
import bcrypt from 'bcrypt'


class UserService {
    async registration(email, password) {
        const existingUser = await UserModel.findOne({email})
        if (existingUser) {
            throw AuthenticationError.EmailExists()
        }

        const handledPassword = await bcrypt.hash(password, 1)
        const newUser = await UserModel.create({
            email,
            password: handledPassword,
        })

        const userData = new UserDto(newUser)
        const tokens = TokenService.generateTokens({...userData})

        await TokenService.saveToken(userData.id, tokens.refreshToken)

        return {...tokens, user: userData}
    }

    async logIn(email, password) {
        try {
            const candedat = await UserModel.findOne({email})

            if (!candedat) {
                throw AuthenticationError.EmailDoesNotExists()
            }

            const passwordFromDB = candedat.password 
            if (!bcrypt.compareSync(password, passwordFromDB)) {
                throw AuthenticationError.InvalidPassword()
            }

            const userData = new UserDto(candedat)
            const tokens = await TokenService.generateTokens({...userData})

            return {...tokens, user: userData}
        }
        catch (e) {
            return null
        }
    }

    async logOut(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh() {

    }
}


export default new UserService()
