# Epic 4: Setup Database + TVDB Integration

## 🎯 Goal

Set up the **database** and **TVDB** API integration to enable persistent storage for series data and allow metadata retrieval from TheTVDB.

## 🏆 Status

⏳ Planned

## ✅ Tasks

### Task 1 – Define Database Schema

-   **1.1** Determine Key Entities

    -   `Series`: fields like `id`, `title`, `tvdbId`, `description`, `status`, `posterUrl`, etc.
    -   `Season`: fields like `id`, `seasonNumber`, `posterUrl`, etc.
    -   `Episode`: fields like `id`, `episodeNumber`, `name`, `airDate`, `subtitleStatus`, etc.

-   **1.2** Establish Relationships

    -   **Series → Season** (One-to-many)
    -   **Season → Episode** (One-to-many)

-   **1.3** Document the Schema
    -   Write all fields and data types in a reference doc (e.g., short `.md` or table).
    -   Decide on naming conventions (e.g., `series_id` vs. `seriesId`).

#### Implementation Notes

-   You can store additional fields like `createdAt` or `updatedAt` if needed.
-   A placeholder for “Plex sync status” or “subtitle status” can be included now or added later.

---

### Task 2 – Create TypeORM Entities

-   **2.1** Create `Series.entity.ts`

    -   Add columns using TypeORM decorators (e.g. `@PrimaryGeneratedColumn`, `@Column`).
    -   Use relationship decorators, e.g. `@OneToMany(() => Season, season => season.series)`.

-   **2.2** Create `Season.entity.ts`

    -   Fields for `seasonNumber`, link to `Series`.
    -   Relationship decorators for episodes.

-   **2.3** Create `Episode.entity.ts`

    -   Fields like `episodeNumber`, `name`, `airDate`.
    -   Relationship to `Season`.

-   **2.4** Validate & Test
    -   Insert dummy data to confirm the schema works.

#### Implementation Notes

-   Keep the schema minimal but flexible enough to store TVDB data.
-   Consider indexing frequently queried fields (e.g., `tvdbId`, `title`).

---

### Task 3 – Setup Nest Module for DB

-   **3.1** Create or Update `DatabaseModule`

    -   Use `TypeOrmModule.forRoot({...})` with PostgreSQL config.
    -   Ensure `.env` or config files hold DB credentials.

-   **3.2** Load Entities

    -   Include entities (Series, Season, Episode) in `TypeOrmModule.forFeature([...])`.

-   **3.3** Validate Migrations (Optional)
    -   Decide if you want to use TypeORM migrations.
    -   Run a test migration to confirm your schema is created.

#### Implementation Notes

-   You can store Nest DB config in `ormconfig.ts` or do it purely via Nest config.
-   Handle dev/test/prod environment differences as needed.

---

### Task 4 – Create TVDB Service

-   **4.1** Set Up TheTVDB API Access

    -   Retrieve a token using your TheTVDB API key.
    -   Handle token expiration and refresh.

-   **4.2** Implement Basic Methods

    -   `searchSeriesByName(query: string)`: returns a list of possible matches.
    -   `getSeriesDetails(tvdbId: number)`: fetch extended info for a series.
    -   (Optional) `getSeasonEpisodes(tvdbSeriesId, seasonNumber)`: to fetch episode lists.

-   **4.3** Store Credentials in `.env`
    -   e.g. `TVDB_API_KEY`, `TVDB_PIN` or user token if required.
    -   Keep them out of Git, load via Nest config.

#### Implementation Notes

-   The TVDB API may require multiple calls for series vs. episodes.
-   Keep the service small and cohesive (only TVDB logic).

---

### Task 5 – Create TVDB Search Endpoint

-   **5.1** Create a Controller Method (e.g., `GET /tvdb/search?query=...`)

    -   Parse the `query` param, call `TvdbService.searchSeriesByName(query)`.

-   **5.2** Return Results

    -   JSON array containing TVDB ID, Series Name, small poster URL, etc.

-   **5.3** Basic Error Handling
    -   If TVDB fails, return an HTTP error (500).
    -   If no matches, return empty array or 404.

#### Implementation Notes

-   Used by the frontend’s “Add Series” UI.
-   Mind CORS if the frontend is on a different domain.

---

### Task 6 – Handle TVDB Conflicts (Optional Early Step)

-   **6.1** Check for Existing Series

    -   If a search returns a TVDB ID already in DB, decide whether to notify the user.

-   **6.2** Decide on the Flow

    -   Could prompt user “This series already exists. Continue or skip?”
    -   Or quietly skip duplicates.

-   **6.3** Implementation Approach
    -   Usually part of the “Add Series” flow.
    -   For now, you can just return normal search data and let the UI handle duplicates.

#### Implementation Notes

-   This step bridges “found series on TVDB” → “store it in DB.”
-   You might skip for now and handle later in the add-series flow.

---

## Notes

-   **Epic 4** builds the **foundation** (DB + TVDB).
-   After this, you can store series data and fetch from TheTVDB.
