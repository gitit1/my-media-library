# Epic 6: Manual Series Add & Confirmation Flow

## 🎯 Goal

Let the user manually search and select a series from TheTVDB, choose artwork and settings, confirm metadata, and save the full series structure (series → seasons → episodes) to the database.  
This includes building the **Series Page UI (tabbed layout)** in “mini mode” for confirmation before saving.  
This UI is later reused in Epic 7.

---

## ✅ Tasks

### **Task 1 – Search Series from TheTVDB**

-   **6.1.1** Create `/series/actions/add` page
-   **6.1.2** Add search input → call `/thetvdb/search?query=...`
-   **6.1.3** Display results with basic metadata (name, summary, poster, year)
-   **6.1.4** On expand → fetch `/thetvdb/extended/:id` (full)
-   **6.1.5** Show default poster/banner/icon + current seasons

---

### **Task 2 – Confirm Match & Save to Database**

> This builds the confirmation interface ("mini series page") using a tabbed layout  
> Tabs: `Save Series` / `General` / `Season N`

-   **6.2.1** Fetch extended metadata from `/thetvdb/extended/:id?full=true`
-   **6.2.2** Create tabbed layout shell (Save / General / Season N)
-   **6.2.3** Add tab switching logic
-   **6.2.4** Save Series tab
    -   Watching status
    -   Subtitle status
    -   Favorite
    -   Virtual flag
-   **6.2.5** General tab
    -   Summary, year, genre
    -   Artwork selection (poster/banner/icon)
    -   Path selector
    -   “Mark all seasons as watched” toggle
-   **6.2.6** Season tabs (read-only)
    -   Show season summary, poster
    -   List episodes
    -   Allow selecting season/episode artwork
-   **6.2.7** Path selection (inside General tab)
-   **6.2.8** Send `POST /series` with full metadata
-   **6.2.9** Simulate scanner feedback in UI (placeholder text + spinner)
-   **6.2.10** Save series + seasons + episodes to DB (with artwork, status, path/virtual)

---

### **Task 3 – Support Virtual Series Lifecycle**

> Save without local path, allow linking later

-   **6.3.1** Add `isVirtual` column to Series entity
-   **6.3.2** Allow `pathId` to be nullable
-   **6.3.3** Add checkbox: “This series is not saved locally”
-   **6.3.4** Skip scan logic on save if virtual
-   **6.3.5** In Saved Series view, show “Link to Filesystem” button
-   **6.3.6** Modal for selecting path
-   **6.3.7** `PATCH /series/:id` → update `pathId` and set `isVirtual = false`
-   **6.3.8** Trigger scanner after linking

---

### **Task 4 – Trigger Filesystem & Scanner After Add**

> Only applies if `isVirtual = false`

-   **6.4.1** Create missing folders
-   **6.4.2** Trigger scanner (stub only in Epic 6)
-   **6.4.3** Show scanner progress placeholder (see 6.2.9)
-   **6.4.4** Redirect user to `/series/[id]` (or Saved Series view)

---

### **Task 5 – Ask About Plex Link**

-   **6.5.1** After save, prompt: “Is this series already linked to Plex?”
-   **6.5.2** If yes → mark as Plex-linked (store Plex ID if available)

---

## 📝 Notes

-   This epic builds the first use of the Series Page UI ("mini mode")
-   It supports saving both local and virtual series
-   It prepares for scanner integration (Epic 8), full editing (Epic 7), and Plex (Epic 10)
-   Final save triggers a fake “scanner” result in the UI until backend logic is ready
