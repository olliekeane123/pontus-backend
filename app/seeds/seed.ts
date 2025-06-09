import { SeedData } from "./../types"
import db from "../app/db/connection"
import format from "pg-format"

const seed = async ({ users }: SeedData) => {
    await db.query(
        "DROP TABLE IF EXISTS users, artworks, artists, artwork_artists, images CASCADE"
    )

    await db.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(25) NOT NULL,
            password VARCHAR(30) NOT NULL
        );
    `)

    const usersQuery = format(
        `INSERT INTO users (username, password) VALUES %L`,
        users.map(({ username, password }) => [username, password])
    )
    await db.query(usersQuery)

    console.log(
        `[SEED] Successfully seeded database with ${users.length} users`
    )
}

export default seed
