import db from '../models/db.js'
import TokenService from './token-service.js'
import UserDto from '../dtos/userDto.js'
import AuthenticationError from '../exceptions/AuthenticationError.js'
import bcrypt from 'bcrypt'


class UserService {
    async registration(email, password) {
 
        const existingUser = (await db.query(`
            SELECT * FROM usermodel WHERE email='${email}' LIMIT 1;  
        `)).rows
        
        if (existingUser.length != 0) {
            throw AuthenticationError.EmailExists()
        }

        const handledPassword = await bcrypt.hash(password, 1)
        const newUser = (await db.query(`
            INSERT INTO usermodel (email, password) values 
            (${email}, '${handledPassword}') RETURNING *;
        `)).rows[0]

        const userData = new UserDto(newUser)
        const tokens = TokenService.generateTokens({...userData})

        await TokenService.saveToken(userData.id, tokens.refreshToken)

        return {...tokens, user: userData}
    }

    async logIn(email, password) {
        try {
            const candedat = (await db.query(`
                SELECT * FROM usermodel WHERE email='${email}' LIMIT 1;
            `)).rows

            console.log(candedat)
            cosole.log(!candedat)

            if (!candedat) {
                throw AuthenticationError.EmailDoesNotExists()
            }

            // const passwordFromDB = candedat.password 
            // if (!bcrypt.compareSync(password, passwordFromDB)) {
            //     throw AuthenticationError.InvalidPassword()
            // }

            // const userData = new UserDto(candedat)
            // const tokens = TokenService.generateTokens({...userData})
            // await TokenService.saveToken(userData.id, tokens.refreshToken)
            
            // return {...tokens, user: userData}
        }
        catch (e) {
            return null
        }
    }

    // async logOut(refreshToken) {
    //     const token = await TokenService.removeToken(refreshToken)
    //     return token
    // }

    // async refresh(refreshToken) {
    //     try {        
    //         if (!refreshToken) {
    //             throw AuthenticationError.NoRefreshToken()
    //         }

    //         const oldToken = await TokenService.findRefreshToken(refreshToken)
    //         const validatedToken = TokenService.validateRefreshToken(refreshToken)

    //         if (!oldToken || !validatedToken) {
    //             throw AuthenticationError.BadRequest()
    //         }

    //         const userData = await UserModel.findOne({_id: oldToken.user})
    //         const userDto = new UserDto(userData)
    //         const tokens = TokenService.generateTokens({userDto})
            
    //         await TokenService.saveToken(userDto.id, tokens.refreshToken)

    //         return {...tokens, user: UserDto}
    //     }
    //     catch (e) {
    //         return null
    //     }
    // } 
}


export default new UserService()
