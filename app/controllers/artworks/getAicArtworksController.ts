import { Request, Response } from "express";
import { getAicArtworksByPage } from "../../services/api/aicService";

const getAicArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const searchTerm = req.query.q as string || "";

        const data = await getAicArtworksByPage(page, searchTerm);
        res.json(data);
    } catch (err) {
        console.error("Error in aicArtworksController:", err);
        res.status(500).json({ error: "Failed to fetch AIC artworks" });
    }
};

export default getAicArtworksController;