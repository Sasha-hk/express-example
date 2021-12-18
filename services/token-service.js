const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { Token } = require('../models')


dotenv.config()

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

        return {accessToken, refreshToken}
    }

    async saveToken(user_id, refreshToken) {
        const existingToken = await Token.findOne({
            where: {
                user_id
            }
        })

        if (existingToken) {
            const existedSave = await Token.update(
                {
                    refresh_token: refreshToken
                },
                {
                    where: {
                        user_id
                    }
                }
            )
            return existedSave.dataValues
        }

        const newToken = await Token.create({
            user_id,
            refresh_token: refreshToken
        })

        return newToken
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }
        catch (e) {
            return null
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }
        catch (e) {
            return null
        }
    }

    async removeToken(refresh_token) {
        const token = await Token.destroy({
            where: {
                refresh_token
            }
        })
        return token 
    }

    async findRefreshToken(refresh_token) {
        const token = await Token.findOne({
            raw: true,
            where: {
                refresh_token
            }
        })
        return token
    }
}


module.exports = new TokenService()
