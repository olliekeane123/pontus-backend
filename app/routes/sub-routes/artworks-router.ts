import { Router } from "express"
import getMetArtworksController from "../../controllers/artworks/getMetArtworksController"
import getAicArtworksController from "../../controllers/artworks/getAicArtworksController"
import getHarvardArtworksController from "../../controllers/artworks/getHarvardArtworksController"
import getClevelandArtworksController from "../../controllers/artworks/getClevelandArtworksController"

const artworksRouter = Router()

artworksRouter.get("/met", getMetArtworksController)
artworksRouter.get("/aic", getAicArtworksController)
artworksRouter.get("/harvard", getHarvardArtworksController)
artworksRouter.get("/cleveland", getClevelandArtworksController)

export default artworksRouter
