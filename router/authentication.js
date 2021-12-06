import Router from 'express'


const router = new Router()

router.post('/sign-in')
router.post('/sign-out')
router.post('/log-in')

router.get('/refresh')


export default router
