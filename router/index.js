import Router from 'express'
import UserController from '../controllers/UserController.js'


const router = new Router()

router.post('/sign-up', UserController.signUp)
router.post('/sign-in')
router.post('/sign-out')

router.get('/refresh')
router.get('/activate/:slug')
router.get('/users')



export default router
