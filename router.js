import Router from 'express'
import PostController from './PostController.js'

export const router = new Router()

router.post('/create', PostController.create)

router.get('/', PostController.getAll)
router.get('/:id', PostController.getDetails)

router.delete('/:id', PostController.delete)

router.put('/', PostController.update)