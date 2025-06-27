# Pontus Backend

This is the **backend API** for [Pontus](https://github.com/yourusername/pontus-frontend), a frontend application for browsing and discovering artworks from two major museum collections:

-   The Art Institute of Chicago (AIC)
-   The Cleveland Museum of Art (CMA)

The backend acts as a middle layer between the frontend and these third-party APIs, normalizing and serving artwork data in a consistent format.

---

## 🚀 Running Locally

### 🔧 Prerequisites

-   Node.js (v18+)
-   npm or yarn

> ⚠️ **Note:** Despite seed and db scripts, this project does **not** require a local database setup or seeding. All artwork data is fetched from external museum APIs.

---

### 📦 Setup

1.  **Clone the repository**

    git clone https://github.com/yourusername/pontus-backend.git
    cd pontus-backend

2.  **Install dependencies**

    npm install

    # or

    yarn install

3.  **Start the development server**

        npm run dev
        # or
        yarn dev

    The server will start on [http://localhost:8000](http://localhost:8000) by default. You can configure a different port via a `.env` file:

        PORT=3001

---

## 🌐 Available Endpoints

### `GET /api`

Returns a list of available API endpoints and their metadata.

---

### `GET /api/artworks/:source`

Returns an array of artworks from the specified museum source.

#### URL Parameters:

-   `:source` — either `aic` (Art Institute of Chicago) or `cleveland` (Cleveland Museum of Art)

#### Query Parameters:

-   `page` (number): Page number for pagination (default is `1`)
-   `q` (string): Optional search term to filter artworks

#### Example:

       GET /api/artworks/aic?page=2&q=monet

#### Example Response:

       {
         "artworks": [
           {
             "id": "123",
             "source": "aic",
             "title": "Artwork Title",
             "dateStart": 1880,
             "dateEnd": 1881,
             "imageUrl": "https://example.com/image.jpg",
             "artistName": "Artist Name",
             "artistBirthDate": 1840,
             "artistDeathDate": 1920
           }
         ],
         "page": 1,
         "totalPages": 50,
         "totalArtworks": 2500
       }

> 📝 **Note:** The `/api/artworks` route **must** include a source (`aic` or `cleveland`). Requests to `/api/artworks` without a source will return nothing.

---

### `GET /api/users`

Returns a list of users.

> ⚠️ **Note:** This route is unused in production and is not currently supported.

---

## 🧪 Scripts

       npm run dev       # Starts the dev server with tsx
       npm run build     # Builds the project with TypeScript
       npm start         # Runs the production build (after building)

The following scripts exist but are **not required** unless you extend the project to use a database:

       npm run setup-db  # Runs ./db/setup.sql to create database tables (not needed)
       npm run seed      # Runs TypeScript seed scripts (not needed)

---

## 🧩 Tech Stack

-   TypeScript
-   Node.js
-   Express
-   Axios (for external API calls)
-   dotenv (for configuration)

---

## 🔗 Related Projects

-   [Pontus Frontend](https://github.com/olliekeane123/pontus-frontend) – The frontend interface that consumes this API.

---

## 📌 Future Improvements

-   Add caching of API results
-   Add rate limiting and error handling enhancements
-   Enhance users endpoint with hashing and more security for future use with frontend
