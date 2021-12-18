const TokenService = require('./token-service')
const UserDto = require('../dtos/userDto')
const AuthenticationError = require('../exceptions/AuthenticationError')
const bcrypt = require('bcrypt')
const { User } = require('../models') 


class UserService {
    async registration(email, password) {
 
        const existingUser = await User.findOne({
            raw: true,
            where: {
                email
            }
        })
        
        if (existingUser) {
            throw AuthenticationError.EmailExists()
        } 

        const handledPassword = await bcrypt.hash(password, 1)
        const newUser = await User.create({
            email, 
            password: handledPassword
        })


        const userData = new UserDto(newUser.dataValues)
        const tokens = TokenService.generateTokens({...userData})

        await TokenService.saveToken(userData.id, tokens.refreshToken)

        return {...tokens, user: userData}
    }

    async logIn(email, password) {
        const candedat = await User.findOne({
            raw: true,
            where: {
                email
            }
        })

        if (!candedat) {
            throw AuthenticationError.EmailDoesNotExists()
        }

        const passwordFromDB = candedat.password 


        if (!bcrypt.compareSync(password, passwordFromDB)) {
            throw AuthenticationError.InvalidPassword()
        }

        const userData = new UserDto(candedat)
        const tokens = TokenService.generateTokens({...userData})
        await TokenService.saveToken(userData.id, tokens.refreshToken)
        
        return {...tokens, user: userData}
    }

    async logOut(refreshToken) {
        if (!refreshToken) {
            throw AuthenticationError.NoRefreshToken()
        }
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {     
        if (!refreshToken) {
            throw AuthenticationError.NoRefreshToken()
        }

        const oldToken = await TokenService.findRefreshToken(refreshToken)
        const validatedToken = TokenService.validateRefreshToken(refreshToken)

        if (!oldToken || !validatedToken) {
            throw AuthenticationError.BadRequest()
        }

        const userData = await User.findOne({
            raw: true,
            where: {
                id: oldToken.user_id
            }
        })

        const userDto = new UserDto(userData)
        const tokens = TokenService.generateTokens({userDto})
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: UserDto}
    } 
}


module.exports = new UserService()
