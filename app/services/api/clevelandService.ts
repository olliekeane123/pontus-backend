import { TransformedArtwork } from "../../types";
import apiClient from "../../lib/apiClient";

const CLEVELAND_BASE_URL = "https://openaccess-api.clevelandart.org/api/artworks";
const PAGE_LIMIT = 50;

export const getClevelandArtworksByPage = async (
    page: number = 1,
    searchTerm: string = ""
) => {
    const url = buildClevelandUrl(page, PAGE_LIMIT, searchTerm);

    const response = await apiClient.get(url);

    const records = response.data.data || [];
    const totalArtworks = response.data.info.total || records.length;

    const artworks: TransformedArtwork[] = records.map(
        transformClevelandArtwork
    );

    return {
        artworks,
        page,
        totalPages: Math.ceil(totalArtworks / PAGE_LIMIT),
        totalArtworks,
    };
};

const buildClevelandUrl = (
    page: number = 1,
    limit: number = 50,
    searchTerm: string = ""
): string => {
    const skip = (page - 1) * limit;

    const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
        created_after: "1860",
        created_before: "1980",
        has_image: "1",
    });

    if (searchTerm) {
        params.append("q", searchTerm);
    }

    return `${CLEVELAND_BASE_URL}?${params.toString()}`;
};

const transformClevelandArtwork = (record: any): TransformedArtwork => {
    const image = record.images?.web?.url || "/placeholder.png";
    const artist = record.creators?.[0]?.description || "Unknown";

    return {
        id: record.id,
        source: "cleveland",
        title: record.title || "Untitled",
        dateStart: record.date_begin || 0,
        dateEnd: record.date_end || 0,
        imageUrl: image,
        artistName: artist,
        artistBirthDate: 0,
        artistDeathDate: null,
    };
};