import { Request, Response } from "express"
import { getAicArtworksByPage } from "../../services/api/aicService"

const getAicArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const data = await getAicArtworksByPage(page)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch Aic artworks" })
    }
}

export default getAicArtworksController
