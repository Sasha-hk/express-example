import mongoose from 'mongoose'

const Post = new mongoose.Schema({
    author: {type: String, requred: true, unique: false},
    title: {type: String, requred: true, unique: true},
    content: {type: String, requred: true, unique: false},
})

export default mongoose.model("Post", Post)