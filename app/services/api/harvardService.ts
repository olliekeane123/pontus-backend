// Example if you have a harvardService.ts
import { TransformedArtwork } from "../../types";
import apiClient from "../../lib/apiClient";

const HARVARD_BASE_URL = "https://api.harvardartmuseums.org/object";
const HARVARD_API_KEY = process.env.HARVARD_API_KEY;

const PAGE_LIMIT = 50;

export const getHarvardArtworksByPage = async (
    page: number = 1,
    searchTerm: string = ""
): Promise<{
    artworks: TransformedArtwork[];
    totalPages: number;
    page: number;
    totalArtworks: number;
}> => {
    if (!HARVARD_API_KEY) {
        console.error("Harvard API Key is not defined.");
        throw new Error("Harvard API Key is missing. Check your environment variables.");
    }

    const params = new URLSearchParams({
        apikey: HARVARD_API_KEY,
        page: page.toString(),
        size: PAGE_LIMIT.toString(), // Harvard uses 'size' for limit
        hasimage: "1", 
    });

    const url = `${HARVARD_BASE_URL}?${params.toString()}`;

    const response = await apiClient.get(url);

    const records = response.data.records || []; // Harvard uses 'records' for data
    const totalArtworks = response.data.info?.totalrecords || 0; // Harvard uses 'info.totalrecords'
    const totalPages = response.data.info?.pages || 1;

    const artworks: TransformedArtwork[] = records.map((record: any) =>
        transformHarvardArtwork(record)
    );

    return {
        artworks,
        page: page,
        totalPages: totalPages,
        totalArtworks: totalArtworks,
    };
};

const transformHarvardArtwork = (record: any): TransformedArtwork => {
    const imageUrl = record.primaryimageurl || record.images?.[0]?.baseimageurl || "/placeholder.png";
    const artist = record.people?.[0]?.displayname || "Unknown";

    return {
        id: record.id,
        source: "harvard",
        title: record.title || "Untitled",
        dateStart: record.dated || record.datebegin || 0, // Harvard has various date fields
        dateEnd: record.dateended || 0,
        imageUrl: imageUrl,
        artistName: artist,
        artistBirthDate: record.people?.[0]?.birthyear || 0,
        artistDeathDate: record.people?.[0]?.deathyear || null,
    };
};