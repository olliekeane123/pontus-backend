import { RawMetArtwork, TransformedArtwork } from "../../types"
import apiClient from "../../lib/apiClient"

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/"
const MET_ARTWORK_IDS_QUERY =
    "search?dateBegin=1860&dateEnd=1980&hasImages=true&q=*"

const PAGE_LIMIT = 50

export const getMetArtworksByPage = async (
    page: number = 1
): Promise<{
    artworks: TransformedArtwork[]
    totalPages: number
    page: number
    totalArtworks: number
}> => {
    const allIds = await fetchAllMetArtworksIds()
    const totalArtworks = allIds.length
    const totalPages = Math.ceil(totalArtworks / PAGE_LIMIT)

    const start = (page - 1) * PAGE_LIMIT
    const end = page * PAGE_LIMIT
    const pageIds = allIds.slice(start, end)

    const results: TransformedArtwork[] = []

    for (const id of pageIds) {
        try {
            const raw = await fetchMetArtworkById(id)
            if (!validateMetArtwork(raw)) {
                results.push({
                    id: 0,
                    source: "met",
                    title: "Unavailable Artwork",
                    dateStart: 0,
                    dateEnd: 0,
                    imageUrl: "/placeholder.png",
                    artistName: "Unknown",
                    artistBirthDate: 0,
                    artistDeathDate: null,
                })
            } else {
                results.push(transformMetArtwork(raw))
            }
        } catch {
            results.push({
                id: 0,
                source: "met",
                title: "Failed to Load",
                dateStart: 0,
                dateEnd: 0,
                imageUrl: "/error.png",
                artistName: "Unknown",
                artistBirthDate: 0,
                artistDeathDate: null,
            })
        }
    }

    return {
        artworks: results,
        page,
        totalPages,
        totalArtworks,
    }
}

const fetchAllMetArtworksIds = async (): Promise<number[]> => {
    const url = `${MET_BASE_URL}${MET_ARTWORK_IDS_QUERY}`

    const response = await apiClient.get(url)
    return response.data.objectIDs
}

const fetchMetArtworkById = async (id: number): Promise<RawMetArtwork> => {
    const url = `${MET_BASE_URL}objects/${id}`

    const response = await apiClient.get(url)
    const artwork: RawMetArtwork = response.data

    return artwork
}

const validateMetArtwork = (artwork: RawMetArtwork): boolean => {
    return (
        typeof artwork.title === "string" &&
        artwork.title !== "" &&
        typeof artwork.artistDisplayName === "string" &&
        artwork.artistDisplayName !== "" &&
        typeof artwork.primaryImage === "string" &&
        artwork.primaryImage !== "" &&
        typeof artwork.objectBeginDate === "number" &&
        typeof artwork.objectEndDate === "number"
    )
}

const transformMetArtwork = (artwork: RawMetArtwork): TransformedArtwork => {
    return {
        id: artwork.objectID || 0,
        source: "met",
        title: artwork.title || "Unknown Title",
        dateStart: artwork.objectBeginDate || 0,
        dateEnd: artwork.objectEndDate || 0,
        imageUrl: artwork.primaryImage || "",
        artistName: artwork.artistDisplayName || "Unknown Artist",
        artistBirthDate: artwork.artistBeginDate
            ? parseInt(artwork.artistBeginDate, 10)
            : 0,
        artistDeathDate: artwork.artistEndDate
            ? parseInt(artwork.artistEndDate, 10)
            : null,
    }
}
