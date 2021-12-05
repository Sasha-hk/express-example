import { Schema, model } from 'mongoose'


const TokenSchama = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
})


export default model('Token', TokenSchama)
