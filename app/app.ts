import express, { type Express } from "express"
import cors from "cors"
import apiRouter from "./routes/api-router"
import {
    globalErrorHandler,
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler,
} from "./middlewares/error-handlers"

const createApp = (): Express => {
    const app = express()

    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    )

    app.use(express.json())

    app.use("/api", apiRouter)

    // 404 handler for unmatched routes
    app.use(globalErrorHandler)

    app.use(psqlErrorHandler)
    app.use(customErrorHandler)
    app.use(serverErrorHandler)

    return app
}

export default createApp
