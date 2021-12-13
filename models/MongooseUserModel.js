import mongoose from 'mongoose'

const {Schema, model} = mongoose 

const UserModel = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})


export default model('User', UserModel)
