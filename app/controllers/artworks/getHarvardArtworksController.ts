import { Request, Response } from "express"
import { getHarvardArtworksByPage } from "../../services/api/harvardService"

const getHarvardArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const data = await getHarvardArtworksByPage(page)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch MET artworks" })
    }
}

export default getHarvardArtworksController
