# Epic 6: Manual Series Add & Confirmation Flow

## 🎯 Goal

Let the user manually search and select a series from TheTVDB, choose artwork and settings, confirm metadata, and save the full series structure (series → seasons → episodes) to the database. This includes building the **Series Page UI (tabbed layout)** in “mini mode” for confirmation before saving.

This is the first use of the new series UI that will later be reused in Epic 7.

---

## ✅ Tasks

### **Task 1 – Search Series from TheTVDB**

-   **6.1.1** Create `/series/actions/add` page
-   **6.1.2** Add search input → call `/thetvdb/search?query=...`
-   **6.1.3** Display results with basic metadata (name, summary, poster, year)
-   **6.1.4** On expand → fetch `/thetvdb/extended/:id` (full)
-   **6.1.5** Show default poster/banner/icon + current seasons

---

### **Task 2 – Open Confirmation UI ("Mini Series Page")**

> This UI becomes the base for the full series view in Epic 7

-   **6.2.1** Open tabbed layout in modal or route:  
    Tabs: `Save Series` / `General` / `Season N`
-   **6.2.2** Tab: **Save Series**
    -   Select watching status
    -   Subtitle status
    -   Mark as favorite
    -   Select file system path (or mark virtual)
-   **6.2.3** Tab: **General**
    -   View series metadata
    -   Select artwork (poster/banner/icon)
    -   Mark all seasons watched
-   **6.2.4** Tab: **Season N**
    -   View episodes (read-only)
    -   Display poster
-   **6.2.5** Support default “Quick Save” (skip modal)

---

### **Task 3 – Save Series to Database**

-   **6.3.1** Save `series`, `seasons`, `episodes`
-   **6.3.2** Save artwork, status, subtitle state
-   **6.3.3** Save `isVirtual` if no path selected

---

### **Task 4 – Trigger Filesystem & Scanner**

> Only if the series is not virtual

-   **6.4.1** Create missing season folders
-   **6.4.2** Trigger scanner for new series
-   **6.4.3** Download missing posters (series, season)
-   **6.4.4** Display scan progress stub (UI)

---

### **Task 5 – Ask About Plex Link**

-   **6.5.1** After save, prompt: “Is this series already linked to Plex?”
-   **6.5.2** If yes → mark as Plex-linked (store Plex ID if known)
-   (Full sync handled in Epic 10)

---

### **Task 6 – Virtual Series Linking (Later)**

> If saved as virtual, allow linking it later from Saved Series

-   **6.6.1** Show “Link to Filesystem” in `/series/views/saved`
-   **6.6.2** Open modal to select path
-   **6.6.3** `PATCH /series/:id` to update `pathId` + `isVirtual = false`
-   **6.6.4** Trigger scanner after linking

---

## 📝 Notes

-   The “mini series page” here becomes the new standard for confirmation and will evolve into the full Series Page in Epic 7.
-   No episode editing or deep interactions — just metadata preview and selection.
-   Artwork selection, path, and status are saved here — this is the full “save flow.”
-   Supports skipping confirmation (auto-confirm with defaults).
