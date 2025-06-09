import { NextFunction, Request, Response } from "express"
import { CustomError } from "../../types"

export const globalErrorHandler = (req: Request, res: Response, next: NextFunction) =>{
    const {originalUrl} = req
    res.status(404).send({msg: `${originalUrl} Not Found On Server`})
}

export const psqlErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "22P02" || err.code === "23502" || err.code === "23503" || err.code === "42601") {
        res.status(400).send({ msg: "Bad Request" })
    } else if (err.code === "42703" || err.code === "42702") {
        res.status(404).send({ msg: "Column Does Not Exist" })
    } else if (err.code === "42P10") {
        res.status(400).send({ msg: "Bad Request: Invalid Sort By" })
    }else {
        next(err)
    }
}

export const customErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
}

export const serverErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(500).send({ msg: "Internal Server Error" })
    }
}
