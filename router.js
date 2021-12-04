import Router from 'express'
import PostController from './PostController.js'

export const router = new Router()

router.post('/', PostController.create)

router.get('/')
router.get('/:id')
router.delete('/:id')