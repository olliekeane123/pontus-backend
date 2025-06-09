import { Request, Response } from "express"
import { getClevelandArtworksByPage } from "../../services/api/clevelandService"

const getClevelandArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const data = await getClevelandArtworksByPage(page)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch Cleveland artworks" })
    }
}

export default getClevelandArtworksController
