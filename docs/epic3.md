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

---

### **Task 2 – Create High-Level Pages**

#### 2.1 – Create Dashboard Page

#### Features:

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

#### Implementation:

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

-   **2.2** Create Series Page

    -   List all tracked series
    -   Add filtering by status, subtitles, and Plex sync

-   **2.3** Create Episode Page

    -   Display episode details
    -   Reflect subtitle and status info

-   **2.4** Create Settings Page

    -   Add form for Plex/OpenSubtitles token management
    -   Add sync toggle

-   **2.5** Create Manage Paths Page

    -   Allow user to add/edit/remove paths
    -   Display path status

-   **2.6** Create Scanner Page
    -   Trigger filesystem scan
    -   Show scan status and detected series

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
