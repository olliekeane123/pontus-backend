import { Request, Response } from "express";
import { getClevelandArtworksByPage } from "../../services/api/clevelandService";

const getClevelandArtworksController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const searchTerm = req.query.q as string || "";

        const data = await getClevelandArtworksByPage(page, searchTerm);
        res.json(data);
    } catch (err) {
        console.error("Error in clevelandArtworksController:", err);
        res.status(500).json({ error: "Failed to fetch Cleveland artworks" });
    }
};

export default getClevelandArtworksController;