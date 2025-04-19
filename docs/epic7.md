# Epic 7: Series Management & Full Series Page

## 🎯 Goal

Allow users to view, manage, and update their saved series, including watch status, subtitle status, and missing episode detection. This epic expands the Series Page UI (originally created in Epic 6) into its **full view mode**, used for day-to-day tracking and updates.

---

## ✅ Tasks

### **Task 1 – Display Saved Series**

-   **7.1.1** Create `GET /series` with all metadata
-   **7.1.2** Display results in `/series/views/saved`
-   **7.1.3** Add UI filters:
    -   Watch status
    -   Subtitle status
    -   Series status (running/ended)
    -   Type (e.g., Cartoon, Drama)
-   **7.1.4** Color-code statuses in the list

---

### **Task 2 – Build Full Series Page (`/series/[id]`)**

> This builds on the tabbed layout from Epic 6

-   **7.2.1** Load series data from DB (`GET /series/:id`)
-   **7.2.2** Tabs: `General`, `Season N`
-   **7.2.3** `General` tab:
    -   Show full metadata (summary, genre, poster/banner/icon)
    -   Manual metadata refresh (TVDB or Plex)
    -   Show linked path
-   **7.2.4** `Season N` tab:
    -   Show episode list
    -   Show watch and subtitle status
    -   Allow toggling per-episode watched / subbed
    -   Allow marking all watched

---

### **Task 3 – Update Series State**

-   **7.3.1** `PATCH /series/:id` to update:
    -   Watch status
    -   Subtitle status
    -   Series status
-   **7.3.2** UI toggle buttons in `/views/saved` + full series page
-   **7.3.3** Optimistic UI updates with fallback retry

---

### **Task 4 – Refresh Metadata**

-   **7.4.1** Add refresh button to full series page
-   **7.4.2** Call `/thetvdb/extended/:id?full=true`
-   **7.4.3** Overwrite metadata in DB (only if confirmed)
-   **7.4.4** Re-render updated info in UI

---

### **Task 5 – Detect & Track Missing Data**

-   **7.5.1** Add logic to detect missing episodes:
    -   Compare TheTVDB season/episode list to local files
-   **7.5.2** Detect subtitle status:
    -   `with`, `mixed`, or `no subs`
-   **7.5.3** Show missing indicators at series + episode level
-   **7.5.4** Integrate into dashboard + filters

---

## 📝 Notes

-   This epic takes over **after a series has been saved** (via Epic 6 or Epic 8)
-   The Series Page UI from Epic 6 is reused and extended here with edit/refresh logic
-   Future: Series page may also show Plex sync info (Epic 10), subtitle refresh (Epic 9), and file actions (Epic 8)
