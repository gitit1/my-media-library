# Epic 3: UI

## 🎯 Goal

Develop a robust and intuitive user interface for managing series, episodes, subtitles, and file movements.

## ✅ Tasks

### **Task 1 – Create Design System with Theme**

-   **1.1** Create a theme system with light/dark mode support

    -   Define primary, secondary, and background colors
    -   Create typography rules (font sizes, weights, line height)
    -   Define spacing rules (padding, margin, etc.)

-   **1.2** Build reusable components

    -   Button
    -   Modal
    -   Card

-   **1.3** Ensure consistent styling with Tailwind
    -   Create `tailwind.config.js`
    -   Define color tokens and spacing rules
    -   Test with reusable components

### **Task 2 – Create High-Level Pages**

#### **2.1 – Create Dashboard Page**

##### <u>Features</u>:

-   **Horizonal Navigator**
    -   Action button for file scanning
    -   Action button for add new series
    -   Action button for add new path
-   **Summary Widgets**
    -   Display total tracked series count
    -   Display number of missing episodes
    -   Display number of missing subtitles
    -   Display watch status (e.g., Watching, Completed, etc.)
    -   Display number of running vs. ended series
    -   Display series type (e.g., Telenovela, Anime, etc.)
-   **Notifications Section**
    -   Show alerts for missing episodes, missing subtitles, or other important updates
    -   If no alerts, display “No new notifications”
-   **Tracked Series Table**
    -   Columns: Poster, Series Name, Watch Status, Subtitle Status, Latest Episode, Actions
    -   Highlight missing episodes and indicate overall subtitle status (with, without, partial)
    -   If no series are tracked, display “No series tracked yet.”

##### <u>Implementation</u>:

-   **Horizonal Navigator**
    -   Create a basic navigation component using our custom UI elements
    -   Provide minimal styling for a horizontal layout (flex row, spacing, etc.)
    -   Include placeholder links (e.g., Dashboard, Series, Settings) for future routing
    -   (Future) Expand links as more pages are implemented
-   **Summary Widgets**
    -   Create placeholder stats (total tracked series, missing episodes, missing subtitles, etc.)
    -   Hard-code the data for now, until server integration is ready
    -   Lay out each stat in small “cards” or boxes for at-a-glance visibility
    -   Prepare fields for possible expansions (e.g., running vs. ended series count, series type)
-   **Notifications Section**
    -   Set up a basic structure for displaying notifications (in a dedicated block)
    -   Use a hard-coded list of different notification types (missing episodes, missing subtitles, new episodes, errors)
    -   For each notification, display a message and a possible action (e.g., “Rescan Path,” “Open Series Page”)
    -   Separate notifications by type or visually label them (optional)
    -   If there are no notifications, show “No new notifications.”
    -   (Future) Integrate notifications from a backend endpoint once available
    -   Add `additionalData` fields for deeper context (episode/series/path info).
    -   Ensure each notification type has the relevant fields populated (when available).
    -   Prepare for eventual UI actions or linking to bulk actions.
-   **Tracked Series Table**
    -   Create a table component with columns for Poster, Series Name, Watch Status, Subtitle Status, Latest Episode, and Actions
    -   Highlight missing episodes (e.g., color coding or label)
    -   Reflect overall subtitle status (with, without, partial)
    -   If no series are tracked, display “No series tracked yet.”
    -   (Future) Add table sorting, filtering, or paging if needed
-   **Dashboard Page (Final Assembly)**

    -   Use `PageContainer` to wrap the entire page layout
    -   Integrate `HorizontalNav` at the top for navigation
    -   Render `SummaryWidgets` below navigation for quick stats
    -   Include the `Notifications` block (from 2.1.3) in a dedicated section
    -   Place the `Series Table` (from 2.1.4) in the main content area
    -   Confirm all sections (nav, widgets, notifications, table) display correctly together
    -   (Future) Replace hard-coded data with real server data when endpoints are ready

---

#### **2.2 – Create Series Page**

##### <u>Features</u>:

###### Tabs Overview

1. **All Series**

    - The main tab listing every tracked series in a grid/list/table, similar to Plex’s layout.
    - **Sort By** (user can pick any of the following):
        - Series status (Ended/Running)
        - Series type
        - Title (default)
        - Year
        - Release date
        - Unwatched
        - Last episode date added
        - Series date added
        - Series date viewed
        - Random
    - **Filters**:
        - Watch status (Watching, Need to Continue, etc.)
        - Subtitle status (With, Without, Mixed)
        - Plex sync status
        - Series type
        - Series data (genre, year)
        - Series status (ended/running)
        - Tags
        - Collections
    - **Search**:
        - For now, search by series name.
        - (Future) Expand to actor, year, keywords, etc.
    - If no series are tracked, display “No series tracked yet.”
    - Clicking on a series navigates to **/series/[id]** for the Single-Series Detail page.

2. **Collections**

    - Placeholder tab for now.
    - Eventually will list all user-defined collections (e.g. “Marvel Shows,” “Anime Collection”).
    - Each collection might link to a filtered view of the “All Series” tab or open a dedicated page.
    - For now, can show a “Coming soon” message or minimal info.

3. **Tags**

    - Another placeholder tab.
    - Eventually displays a list of available tags (like “Telenovela,” “For Kids,” etc.).
    - Each tag could link to a filtered list of the All Series tab or open a separate page.
    - For now, just a placeholder.

4. **Categories**
    - Also a placeholder for custom user categories, or a higher-level classification of shows.
    - Similar to tags, but might be broader or predefined.
    - For now, show minimal info or “Coming soon.”

-   **Single-Series Detail (2.2.2)**
    -   **Route**: `/series/[id]`
    -   **Layout**:
        -   Use a **tabs** approach for different aspects of the same series:
            1. **Overview**: poster, description, watch/subtitle status, Plex indicator, quick actions.
            2. **Seasons/Episodes**: collapsible or listed episodes, status toggles, sub management.
            3. **Collections/Tags**: a placeholder tab to eventually manage or view which collections/tags the series belongs to.
            4. **Categories**: another placeholder tab for future expansions (e.g., custom categories, advanced grouping).
    -   **Data**:
        -   Fetch from the backend: general info, seasons/episodes, tags, etc.
    -   **UI/UX**:
        -   Show the relevant tab content. For now, the “Collections/Tags” and “Categories” tabs can just say “Coming soon” or display minimal info.
        -   Provide quick actions like “Mark season as watched,” “Re-scan,” or “Manage subtitles” in the “Overview” or “Seasons/Episodes” tabs.
    -   **Error/Empty Handling**:
        -   If the series doesn’t exist or has no data, display “Series not found.”

##### <u>Implementation</u>:

1. **(2.2.1) Series List**

-   **Route**: `/series`
-   **Tabs Layout**:
    -   Use a `<Tabs>` or `<SegmentedControl>` UI component at the top.
    -   Default tab: **All Series**.
    -   Other tabs: **Collections**, **Tags**, and **Categories**.
-   **All Series Tab**:
    -   **Layout**:
        -   A dedicated **FilterBar** or header section with the user’s chosen Sort + Filters + Search input.
        -   Series displayed in a **CardGrid** or table, using custom UI components (not raw `<div>`/`<span>`).
    -   **Data**:
        -   Fetch the full series list from the backend using SWR or React Query.
        -   Apply filters, sorting, and search either client-side or server-side (depending on performance needs).
    -   **UI/UX**:
        -   Each item shows poster, name, watch status (icon/badge), subtitle status, Plex sync state, etc.
        -   Clicking a series leads to `/series/[id]` (Single-Series Detail).
        -   If no series match, display “No series found.”
-   **Collections / Tags / Categories Tabs**:
    -   For now, each is a **placeholder** with minimal or no data. Possibly fetch any existing definitions from the backend if you have endpoints available. Otherwise, just display “Coming soon” or dummy data.
    -   In the future, each tab will have its own filtering, creation, editing, or linking UI.
-   **Navigation**:
    -   Add a main nav link labeled “Series,” which takes the user to `/series`.
    -   Possibly allow direct linking to a particular tab, e.g. `/series?tab=collections`.
-   **Future Enhancements**:
    -   Build out full Collections, Tags, and Categories management in these respective tabs.
    -   Bulk actions (mark multiple series, remove multiple series).
    -   Infinite scroll or pagination for large libraries.

2. **(2.2.2) Single-Series Detail**

    - **Route**: `/series/[id]`
    - **Layout**:
        - **Header Section**: Series poster, name, watch status, subtitle status, etc.
        - **Seasons & Episodes**:
            - Possibly a collapsible structure (Season 1, Season 2, etc.).
            - Each episode shows watch status, subtitle status, and an action button to mark it watched or manage subs.
        - **Tags/Labels**: Show any assigned tags (like “Telenovela,” “Japanese,” “Marvel,” etc.) with an option to add/remove tags.
    - **Data**:
        - Fetch detailed series info (title, seasons, episodes, statuses) from the backend.
        - Potentially fetch Plex info if linked, TheTVDB info for missing data, etc.
    - **UI/UX**:
        - Provide quick actions: “Mark season watched,” “Add subtitles,” “Link to Plex,” etc.
        - Indicate missing episodes or missing subs in a prominent way.
    - **Error/Empty Handling**:
        - If the series doesn’t exist or has no data, display a friendly message (“Series not found.”).

3. **Navigation & Integration**

    - Add “Series” link to the top-level navigation (like “Dashboard,” “Series,” “Settings”).
    - Ensure the **Dashboard** page can link directly to `/series` (the list) or `/series/[id]` (a specific series).

4. **(Future Enhancements)**
    - Sorting by date added, name, or next aired episode.
    - Bulk actions for multiple series at once.
    - Advanced filtering by tags, missing episodes, or release year.
    - Pagination or infinite scroll if the tracked series list gets very large.

#### **2.3 – Create Single-Series and Episode Page**

##### <u>Features</u>:

-   **Single-Series View:**

    -   Display full series details:
        -   Poster, description, watch status, subtitle status, Plex sync status, etc.
        -   Display available seasons with collapsible episode listings.
        -   Allow editing of watch/subtitle status from this view.
        -   Quick actions (mark all episodes watched, rescan, etc.).

-   **Episode View:**

    -   Display detailed info for an episode:
        -   Episode name, number, air date, runtime, and description.
        -   Subtitle availability and status.
    -   Quick actions (mark as watched, download subtitles, etc.).

-   **Navigation:**
    -   Clicking on a series from the Saved Series Page → Opens the Single-Series Page.
    -   Clicking on an episode → Opens the Episode Page.

#### **2.4 – Create Add Series Page**

A dedicated page for searching TheTVDB and adding new series.

##### <u>Features</u>:

-   **Search:**
    -   Search by series name (initially).
    -   Display search results in a list/grid format.
    -   Include poster, description, year, and network info.
-   **Confirmation:**
    -   Allow user to confirm or decline a match.
    -   If confirmed, prompt the user to select a filesystem location.
    -   Save the match to the database.
-   **Future Enhancements:**
    -   Expand search options (actor, keywords, year).
    -   Add error handling for failed searches.

#### **2.5 – Create Settings Page**

    -   Add form for Plex/OpenSubtitles token management
    -   Add sync toggle

#### **2.6** Create Manage Paths Page

    -   Allow user to add/edit/remove paths
    -   Display path status

#### **2.7** Create Scanner Page

    -   Trigger filesystem scan
    -   Show scan status and detected series

#### **2.8 – Create Statistics Page**

-   Display overall statistics:
    -   Total number of series, missing episodes, missing subtitles.
    -   Percentage of series with Plex sync.
-   Future: Add charts/graphs for breakdown.

#### **2.9 – Create Unmatched Series Page**

-   List series that failed to match TheTVDB.
-   Allow manual match attempts.
-   Display series name, file path, and attempted match.

#### **2.10 – Create Notifications Page**

-   Display notifications (missing episodes, new episodes, etc.).
-   Allow marking notifications as read.
-   Quick actions for rescan or linking.

---

### **Task 3 – Implement State Management**

-   **3.1** Set up React Context

    -   Create state provider
    -   Handle state updates

-   **3.2** Use SWR for real-time state updates

    -   Create fetchers for state updates
    -   Handle revalidation logic

-   **3.3** Sync state with backend
    -   Trigger revalidation on changes
    -   Handle caching

---

### **Task 4 – Create Global Error Boundary**

-   **4.1** Create ErrorBoundary component

    -   Catch and handle UI-level errors
    -   Display fallback UI

-   **4.2** Log errors for debugging
    -   Use `console.error` or `Sentry`
    -   Provide readable error messages

---

### **Task 5 – Store Dark/Light Mode in Local Storage**

-   **5.1** Store user preference in local storage

    -   Save current mode to `localStorage`

-   **5.2** Ensure persistence across sessions

    -   Restore mode on app reload

-   **5.3** Reflect mode changes dynamically
    -   Update UI on mode change

---

### **Task 6 – Define Component Structure**

-   **6.1** Create `components/` directory

    -   Create `/components`
    -   Create `/hooks`

-   **6.2** Organize UI components logically

    -   Group components by feature
    -   Create shared directory for common components

-   **6.3** Create hooks for shared logic
    -   Create `useFetch` hook
    -   Create `useStateManager` hook

---

### **Task 7 – Ensure Accessibility (a11y) Compliance**

-   **7.1** Follow WCAG color contrast guidelines

    -   Test contrast levels using an accessibility tool

-   **7.2** Add ARIA roles for dynamic content

    -   Add `role="button"` and `aria-label` where needed

-   **7.3** Implement focus state handling
    -   Ensure focus is visible on keyboard navigation

---

### **Task 8 – Add Metadata & SEO Handling**

-   **8.1** Create `next/head` defaults

    -   Add title, description, and canonical URL

-   **8.2** Add OpenGraph metadata

    -   Add image, title, and description for social sharing

-   **8.3** Ensure dynamic metadata updates
    -   Reflect dynamic titles and descriptions based on series data

## 🏆 Status

⏳ Planned

## 📝 Notes

This epic focuses on ensuring the frontend is modular, consistent, and scalable.
