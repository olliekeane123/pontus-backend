import { Router } from 'express'
import usersRouter from './sub-routes/users-router'
import artworksRouter from './sub-routes/artworks-router'
import getApiController from '../controllers/getApiController'

const router = Router()

router.get("/", getApiController)

router.get('/health', (req, res) => {
    res.send({status: 'OK'})
})

router.use("/users", usersRouter)

router.use("/artworks", artworksRouter)

export default router
