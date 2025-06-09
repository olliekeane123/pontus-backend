export type SeedData = {
    users: User[];
};

export type User = {
    id: string;
    username: string;
    password: string;
};


export type CustomError = {
    status?: number;
    msg?: string;
    code?: string
};


export type ApiError = {
    message: string,
    statusCode: number,
    details?: unknown
}

export type RawMetArtwork = {
    objectID?: number
    title?: string
    artistDisplayName?: string
    artistDisplayBio?: string
    artistBeginDate?: string
    artistEndDate?: string | null
    artistNationality?: string
    objectBeginDate?: number,
    objectEndDate?: number,
    medium?: string
    primaryImage?: string
    primaryImageSmall?: string
    objectURL?: string
    department?: string
    isHighlight?: boolean
    isPublicDomain?: boolean
    [key: string]: any
}


export type TransformedArtwork = {
    id: number,
    source: "met" | "aic" | "harvard" | "cleveland",
    title: string,
    dateStart: number,
    dateEnd: number
    imageUrl: string
    
    artistName: string,
    artistBirthDate: number
    artistDeathDate: number | null
}