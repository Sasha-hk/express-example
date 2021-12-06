import Router from 'express'


const router = new Router()

router.post('/register')
router.post('/log-in')
router.post('/log-out')

router.get('/refresh')


export default router
