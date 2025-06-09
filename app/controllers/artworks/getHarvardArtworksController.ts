// Example if you have a harvardArtworksController.ts
import { Request, Response } from "express";
import { getHarvardArtworksByPage } from "../../services/api/harvardService";

const getHarvardArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const searchTerm = req.query.q as string || ""; // Will likely be empty from frontend

        const data = await getHarvardArtworksByPage(page, searchTerm);
        res.json(data);
    } catch (err) {
        console.error("Error in harvardArtworksController:", err);
        res.status(500).json({ error: "Failed to fetch Harvard artworks" });
    }
};

export default getHarvardArtworksController;