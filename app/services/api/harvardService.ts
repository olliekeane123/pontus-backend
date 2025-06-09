import { TransformedArtwork } from "../../../types"
import apiClient from "../../lib/apiClient"

const HARVARD_BASE_URL = "https://api.harvardartmuseums.org/object"
const HARVARD_API_KEY = process.env.HARVARD_API_KEY || ""
const PAGE_LIMIT = 50

const buildHarvardUrl = (page: number) => {
  const query = new URLSearchParams({
    apikey: HARVARD_API_KEY,
    page: page.toString(),
    size: PAGE_LIMIT.toString(),
    hasimage: "1",
    sort: "datebegin",
    datebegin: "1860",
    dateend: "1980",
    classification: "Paintings", // optional filter to help precision
    fields: "id,title,dated,primaryimageurl,people,datebegin,dateend",
  })

  return `${HARVARD_BASE_URL}?${query.toString()}`
}

export const getHarvardArtworksByPage = async (page: number = 1) => {
    try {
        
        const response = await apiClient.get(buildHarvardUrl(page))

        const { info, records } = response.data

        const artworks: TransformedArtwork[] = records.map((record: any) =>
            transformHarvardArtwork(record)
        )

        return {
            artworks,
            page: info.page,
            totalPages: info.pages,
            totalArtworks: info.totalrecords,
        }
    } catch (error: any) {
        console.error("Harvard API Error:", error?.response?.data || error)
        throw error
    }
}

const transformHarvardArtwork = (artwork: any): TransformedArtwork => {
    const person = artwork.people?.[0] || {}

    return {
        id: artwork.id,
        source: "harvard",
        title: artwork.title || "Untitled",
        dateStart: artwork.datebegin || 0,
        dateEnd: artwork.dateend || 0,
        imageUrl: artwork.primaryimageurl || "/placeholder.png",
        artistName: person.name || "Unknown",
        artistBirthDate: 0, // not always available
        artistDeathDate: null,
    }
}
