import { TransformedArtwork } from "../../types";
import apiClient from "../../lib/apiClient";

const AIC_BASE_URL_ARTWORKS = "https://api.artic.edu/api/v1/artworks";
const AIC_BASE_URL_SEARCH = "https://api.artic.edu/api/v1/artworks/search";
const PAGE_LIMIT = 50;

export const getAicArtworksByPage = async (
    page: number = 1,
    searchTerm: string = ""
): Promise<{
    artworks: TransformedArtwork[];
    totalPages: number;
    page: number;
    totalArtworks: number;
}> => {
    let baseUrl = AIC_BASE_URL_ARTWORKS;
    const params: any = {
        fields: "id,title,image_id,artist_display,date_start,date_end",
    };

    if (searchTerm) {
        baseUrl = AIC_BASE_URL_SEARCH;
        params.q = searchTerm;
        params.from = (page - 1) * PAGE_LIMIT;
        params.size = PAGE_LIMIT;
    } else {
        params.page = page;
        params.limit = PAGE_LIMIT;
    }

    const response = await apiClient.get(baseUrl, {
        params,
    });

    const { pagination, data } = response.data;

    const artworks: TransformedArtwork[] = data.map((artwork: any) =>
        transformAicArtwork(artwork)
    );

    return {
        artworks,
        page: pagination.current_page,
        totalPages: pagination.total_pages,
        totalArtworks: pagination.total,
    };
};

const transformAicArtwork = (artwork: any): TransformedArtwork => {
    const imageUrl = artwork.image_id
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
        : "/placeholder.png";

    return {
        id: artwork.id,
        source: "aic",
        title: artwork.title || "Untitled",
        dateStart: artwork.date_start || 0,
        dateEnd: artwork.date_end || 0,
        imageUrl,
        artistName: artwork.artist_display || "Unknown",
        artistBirthDate: 0,
        artistDeathDate: null,
    };
};