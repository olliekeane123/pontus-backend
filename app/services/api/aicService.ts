import { TransformedArtwork } from "../../types"
import apiClient from "../../lib/apiClient"

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks"
const PAGE_LIMIT = 50

export const getAicArtworksByPage = async (
    page: number = 1
): Promise<{
    artworks: TransformedArtwork[]
    totalPages: number
    page: number
    totalArtworks: number
}> => {
    const response = await apiClient.get(AIC_BASE_URL, {
        params: {
            page,
            limit: PAGE_LIMIT,
            fields: "id,title,image_id,artist_display,date_start,date_end",
        },
    })

    const { pagination, data } = response.data

    const artworks: TransformedArtwork[] = data.map((artwork: any) =>
        transformAicArtwork(artwork)
    )

    return {
        artworks,
        page: pagination.current_page,
        totalPages: pagination.total_pages,
        totalArtworks: pagination.total,
    }
}

const transformAicArtwork = (artwork: any): TransformedArtwork => {
    const imageUrl = artwork.image_id
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
        : "/placeholder.png"

    return {
        id: artwork.id,
        source: "aic",
        title: artwork.title || "Untitled",
        dateStart: artwork.date_start || 0,
        dateEnd: artwork.date_end || 0,
        imageUrl,
        artistName: artwork.artist_display || "Unknown",
        artistBirthDate: 0, // AIC does not provide these in this endpoint
        artistDeathDate: null,
    }
}
