import Router from 'express' 
import UserController from '../controllers/user-controller.js'


const router = new Router()

router.post('/register', UserController.registration)
router.post('/log-in')
router.post('/log-out')

router.get('/refresh')


export default router
