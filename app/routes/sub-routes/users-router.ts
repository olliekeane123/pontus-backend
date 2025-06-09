import { Router } from "express"
import getUsersController from "../../controllers/getUsersController"

const usersRouter = Router()

usersRouter.route("/").get(getUsersController)

export default usersRouter
