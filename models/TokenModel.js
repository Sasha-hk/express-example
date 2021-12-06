import mongoose from 'mongoose'
const { Schema, model } = mongoose

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


export default model('Token', TokenModel)
