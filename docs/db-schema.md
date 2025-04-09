# My Media Library — Database Schema

This document outlines the main entities (`Series`, `Season`, `Episode`, `Subtitle`, and `MediaPath`) based on the code you provided. Each section includes field names, data types, defaults, and relationships.

---

## 1. **Series**

| Field                   | Type                | Description / Notes                                                     |
| ----------------------- | ------------------- | ----------------------------------------------------------------------- |
| **id**                  | number (PK)         | Auto-increment primary key                                              |
| **thetvdb_id**          | number              | Unique. Primary TheTVDB ID for the series                               |
| **original_thetvdb_id** | string (nullable)   | Possibly used if the series had a previous/alternate TheTVDB ID         |
| **plex_id**             | string (nullable)   | For Plex integration                                                    |
| **opensubtitles_id**    | number (nullable)   | For OpenSubtitles integration                                           |
| **folder_name**         | string              | Unique. Folder name on disk (used as a local identifier)                |
| **name**                | string              | Primary series name (usually English)                                   |
| **hebrewName**          | string (nullable)   | Hebrew title, if applicable                                             |
| **network**             | string (nullable)   | TV network / channel                                                    |
| **year**                | number (nullable)   | Year of the series’ initial release                                     |
| **seriesStatus**        | string              | Defaults to `"Running"`. Possibly "Ended" or other states.              |
| **watchingStatus**      | string              | Defaults to `"005"`. A custom code to track viewing state               |
| **subtitleStatus**      | string              | Defaults to `"No Subs"`. High-level subtitle status ("With Subs", etc.) |
| **summary**             | text (nullable)     | Brief description or synopsis                                           |
| **posterPath**          | string (nullable)   | Path or URL to the series poster                                        |
| **currentEpisode**      | number (nullable)   | If you track the currently viewed/next episode                          |
| **tags**                | string[] (nullable) | Stored as a simple array (CSV) in the DB                                |
| **genre**               | string[] (nullable) | Also stored as a simple array                                           |
| **favorite**            | boolean             | Defaults to `false`. Used to mark “favorite” status                     |

**Relationships**

-   **`seasons`**: One-to-many → `Season.season` (i.e., `@OneToMany(() => Season, season => season.series)`).

---

## 2. **Season**

| Field            | Type              | Description / Notes                                               |
| ---------------- | ----------------- | ----------------------------------------------------------------- |
| **id**           | number (PK)       | Auto-increment primary key                                        |
| **thetvdb_id**   | number            | TheTVDB ID for the season                                         |
| **seriesId**     | number            | Also stored as a column. Links to `Series.id`                     |
| **plex_id**      | string (nullable) | For Plex integration                                              |
| **seasonNumber** | number            | 1, 2, 3, etc.                                                     |
| **summary**      | text (nullable)   | Brief description for this season                                 |
| **posterPath**   | string (nullable) | Path/URL to the season poster                                     |
| **watched**      | boolean           | Defaults to `false`. Marks entire season as watched/unwatched     |
| **episodeCount** | number            | Defaults to `0`. Possibly total episodes recognized in the season |

**Relationships**

-   **`series`**: Many-to-one → `Series.seasons` (Cascade on delete).
-   **`episodes`**: One-to-many → `Episode.season`.

---

## 3. **Episode**

| Field               | Type              | Description / Notes                                           |
| ------------------- | ----------------- | ------------------------------------------------------------- |
| **id**              | number (PK)       | Auto-increment primary key                                    |
| **thetvdb_id**      | number            | TheTVDB ID for the episode                                    |
| **seriesId**        | number            | Also stored as a column. Links to the parent series’s ID      |
| **episodeNumber**   | number            | Episode index within the season                               |
| **name**            | string (nullable) | Title of the episode                                          |
| **summary**         | text (nullable)   | Episode synopsis                                              |
| **airDate**         | Date (nullable)   | Original air date                                             |
| **filePath**        | string (nullable) | Local file path for the episode (if any)                      |
| **posterPath**      | string (nullable) | Poster/thumbnail path, if any                                 |
| **plex_id**         | string (nullable) | For Plex integration                                          |
| **hasBuiltSubs**    | boolean           | Defaults to `false`. Means the episode file has built-in subs |
| **hasExternalSubs** | boolean           | Defaults to `false`. Means separate sub files exist           |
| **watched**         | boolean           | Defaults to `false`. Mark the episode as watched/unwatched    |

**Relationships**

-   **`season`**: Many-to-one → `Season.episodes` (Cascade on delete).
-   **`subtitles`**: One-to-many → `Subtitle.episode`.

---

## 4. **Subtitle**

| Field                | Type        | Description / Notes                                                  |
| -------------------- | ----------- | -------------------------------------------------------------------- |
| **id**               | number (PK) | Auto-increment primary key                                           |
| **episodeThetvdbId** | number      | TheTVDB ID of the parent episode (stored separately)                 |
| **language**         | string      | The language code (e.g., "heb", "en", "es")                          |
| **filePath**         | string      | Local path to the subtitle file                                      |
| **isBuiltIn**        | boolean     | Defaults to `false`. Indicates if it’s part of the episode container |

**Relationships**

-   **`episode`**: Many-to-one → `Episode.subtitles` (Cascade on delete).

---

## 5. **MediaPath**

| Field      | Type              | Description / Notes                                  |
| ---------- | ----------------- | ---------------------------------------------------- |
| **id**     | number (PK)       | Auto-increment primary key                           |
| **path**   | string            | The actual folder path on the filesystem             |
| **name**   | string (nullable) | Optional descriptive name for this path              |
| **desc**   | string (nullable) | Extra description or notes                           |
| **active** | boolean           | Defaults to `true`. Whether path is currently in use |

**Relationships**

-   _None directly declared_ in the code snippet. This entity stands alone, used for scanning logic (Epic 5, Epic 8).

---

## Additional Notes / Observations

-   **Cascading Deletions**:

    -   `@ManyToOne(() => Series, …, { onDelete: 'CASCADE' })` in `Season`, `Episode`, etc. ensures that if you remove a Series, its Seasons get removed, and so on.

-   **seriesId / thetvdb_id duplication**:

    -   Some classes (like `Season` or `Episode`) have both `seriesId` and `thetvdb_id`. It can be useful for quick references but also a possible source of confusion. Just be consistent in usage.

-   **Watch statuses**:

    -   `Series` has a `watchingStatus` (string code like "005"), but `Season` and `Episode` also have `watched` booleans. You might unify logic for watch states or keep it separate at each level.

-   **Subtitle** fields\*\*:

    -   You have `episodeThetvdbId` in the `Subtitle` entity. Sometimes folks rely solely on the `episode` relationship to know that info. But if it’s helpful for quick lookups, that’s fine.

-   **Recommended Additions** (Optional):
    -   Timestamps (`createdAt`, `updatedAt`) across all entities, if you plan to track insertion or update times.
    -   Additional indexing (e.g., for `folder_name`, `thetvdb_id`, etc.), if you do large queries.

---

## Schema Diagram (Conceptual)

-   **Series** (1) → (∞) **Season** → (∞) **Episode** → (∞) **Subtitle**
-   **MediaPath** stands alone and references the file system path; used for scanning logic in future epics.

---

**This document** reflects the entities, fields, and relationships as specified in your current `.entity.ts` files. If you need more advanced features (multi-user, advanced scanning rules, etc.), you can expand later.
