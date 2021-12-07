import Router from 'express' 
import UserController from '../controllers/user-controller.js'


const router = new Router()

router.post('/register', UserController.registration)
router.post('/log-in', UserController.logIn)
router.post('/log-out', UserController.logOut)

router.get('/refresh')


export default router
