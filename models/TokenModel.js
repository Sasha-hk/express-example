import mongoose from 'mongoose'
const { Schema, models } = mongoose

const TokenModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true,
    },
})


export default models('Token', TokenModel)
