# Database Schema for My Media Library

## Series

-   **id**: primary key (auto-increment integer)
-   **tvdbId**: string or integer (to store TheTVDB ID)
-   **title**: string (series name)
-   **status**: string (e.g., "Running", "Ended", "Unknown")
-   **posterUrl**: string (URL to the poster image)
-   **description**: text (brief summary)
-   **createdAt**: datetime (optional, if you want timestamps)
-   **updatedAt**: datetime (optional)

## Season

-   **id**: primary key (auto-increment integer)
-   **seasonNumber**: integer
-   **posterUrl**: string (optional)
-   **seriesId**: foreign key to **Series**.
    (One Series → Many Seasons)

## Episode

-   **id**: primary key (auto-increment integer)
-   **episodeNumber**: integer
-   **name**: string (episode title)
-   **airDate**: date or datetime
-   **subtitleStatus**: string (e.g., "with subs", "no subs", "mixed"; optional)
-   **seasonId**: foreign key to **Season**.
    (One Season → Many Episodes)
