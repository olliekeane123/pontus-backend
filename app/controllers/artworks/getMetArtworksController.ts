import { Request, Response } from "express"
import { getMetArtworksByPage } from "../../services/api/metService"

const getMetArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const data = await getMetArtworksByPage(page)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch MET artworks" })
    }
}

export default getMetArtworksController
