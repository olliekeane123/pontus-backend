import * as devData from "../app/data/dev-data/index"
import seed from "./seed"
import db from "../app/db/connection"

const runSeed = async () => {
    try {
        await seed(devData)
        await db.end()
    } catch (error) {
        throw error
    }
}

runSeed()
