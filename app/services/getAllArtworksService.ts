/* import apiClient from "../lib/apiClient"

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks/"
const AIC_ARTWORK_IDS_QUERY =
    "search?query[bool][must][0][range][date_start][gte]=1860&query[bool][must][0][range][date_start][lte]=1980"

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/"
const MET_ARTWORK_IDS_QUERY =
    "search?dateBegin=1860&dateEnd=1980&hasImages=true&q=*"

const PAGE_LIMIT = 50



const fetchAllArtworks = async (page: number = 1): Promise<any[]> => {
    const [aicArtworksIds, metArtworksIds] = await Promise.all([
        fetchAllAicArtworksIds(page),
        fetchAllMetArtworksIds(),
    ])

    const aicArtworksPromises = aicArtworksIds.map((artwork: any) =>
        fetchAicArtworkById(artwork.id)
    )
    const metArtworksPromises = metArtworksIds.map((id: number) =>
        fetchMetArtworkById(id)
    )
    const aicArtworks = await Promise.all(aicArtworksPromises)
    const metArtworks = await Promise.all(metArtworksPromises)

    return [...aicArtworks, ...metArtworks]
}



const fetchAllAicArtworksIds = async (page: number = 1): Promise<any[]> => {

    const url = `${AIC_BASE_URL}${AIC_ARTWORK_IDS_QUERY}&page=${page}&limit=${PAGE_LIMIT}`
    
    const response = await apiClient.get(url)
    return response.data.data
}





const fetchAllMetArtworksIds = async (): Promise<number[]> => {
    const url = `${MET_BASE_URL}${MET_ARTWORK_IDS_QUERY}`

    const response = await apiClient.get(url)
    return response.data.objectIDs || []
}














const fetchAicArtworkById = async (id: string): Promise<any> => {
    const response = await apiClient.get(`${AIC_BASE_URL}${id}`)
    return response.data.data
}

const fetchMetArtworkById = async (id: number): Promise<any> => {
    const response = await apiClient.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    )
    return response.data
}


fetchAllAicArtworksIds()

https://api.artic.edu/api/v1/artworks/search?query[bool][must][0][range][date_start][gte]=1860&query[bool][must][0][range][date_start][lte]=1980&sort=date_start&page=1&limit=50






const fetchAllArtworksService = async (
    page: number = 1,
    limit: number = 50
) => {
    const artworks: any[] = []


    const [aicArtworksIds, metArtworksIds] = await Promise.all([
        fetchAllAicArtworksIds(page),
        fetchAllMetArtworksIds(),
    ])
    




    while (artworks.length < limit) {

    }
}


 */