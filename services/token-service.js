const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const existingToken = (await db.query(`
            SELECT * FROM token WHERE user_id='${userId}';
        `)).rows

        if (existingToken.length != 0) {
            const existedSave = db.query(`
                UPDATE token
                SET refresh_token='${refreshToken}'
                WHERE user_id=${userId};
            `)
            return existedSave
        }

        const newToken = (await db.query(`
            INSERT INTO token (user_id, refresh_token) values
            (
                ${userId},
                '${refreshToken}'
            ) RETURNING *;
        `)).rows[0]

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

    async removeToken(refreshToken) {
        try {
            const token = await db.query(`
                DELETE FROM token  WHERE refresh_token='${refreshToken}'; 
            `)
            return token
        }
        catch (e) {
            return null
        }
    }

    async findRefreshToken(refreshToken) {
        try {
            const token = (await db.query(`
                SELECT * FROM token WHERE refresh_token = '${refreshToken}';
            `)).rows[0]
            return token
        }
        catch (e) {
            return null
        }
    }
}


module.exports = new TokenService()
