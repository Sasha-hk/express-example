const Router = require('express')
const UserController = require('../controllers/user-controller')
const AuthenticationMiddleware = require('../middlewares/AuthMiddleware')


const router = new Router()

router.post('/register', UserController.registration)
router.post('/log-in', UserController.logIn)
router.post('/log-out', UserController.logOut)

router.get('/refresh', UserController.refresh)
router.get('/users', AuthenticationMiddleware, UserController.getUsers)


module.exports = router
