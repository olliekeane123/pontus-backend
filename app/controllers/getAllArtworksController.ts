/* import { Request, Response, NextFunction } from "express"
import getArtworksService from "../services/getUsersService"

const getAllArtworksController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const artworks = await getAllArtworksService()
        res.status(200).send({ artworks })
    } catch (error) {    
        next(error)
    }
}

export default getAllArtworksController
 */