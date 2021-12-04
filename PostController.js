import Post from './Post.js'


class PostController {
    async create(req, res) {
        try {
            const {author, title, content} = req.body
        
            const post = await Post.create({author, title, content})
    
            res.json(post)
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const post = await Post.find()
            res.json(post)
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
    
    async getDetails(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('Id not specefied')
            }

            const post = await Post.findById(id)
    
            res.json(post)
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
    
    async update(req, res) {
        try {
            const post = req.body
            if (!post._id) {
                res.status(400).json('Id not specefied')
            }
            
            const updatedPost = Post.findByIdAndUpdate(post._id, post, {new: true})

            res.json(updatedPost)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    
    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('Id not specefied')
            }

            const post = Post.findByIdAndDelete(id)

            res.json('ok')
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }



}

export default new PostController()