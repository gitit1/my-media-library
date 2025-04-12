# Epic 7: Series Management

## 🎯 Goal

Build the data-driven logic for managing series, episodes, and status.

## 🏆 Status

⏳ Planned

## ✅ Tasks

### **Task 1 – Fetch & Display Series**

-   **7.1** Create `GET /series` (includes all metadata)
-   **7.2** Display series list in SavedSeries page (`/series/views/saved`)
-   **7.3** Add UI filters: watch status, subtitle status, series status, type
-   **7.4** Color-code statuses in list view

---

### **Task 2 – Update Watching / Subtitle Status**

-   **7.2.1** Create `PATCH /series/:id` for status updates
-   **7.2.2** Add status toggle buttons (watching, subs)
-   **7.2.3** Reflect update in UI immediately (optimistic update)

---

### **Task 3 – Refresh Metadata**

-   **7.3.1** Manual Refresh button: call `/thetvdb/extended/:id?full=true`
-   **7.3.2** Save new data to DB
-   **7.3.3** Reflect updated fields in UI

---

### **Task 4 – Track Missing Data Internally**

-   **7.4.1** Add logic to detect missing episodes from TheTVDB vs file scan
-   **7.4.2** Add logic to compute subtitle status (`with`, `mixed`, `none`)
-   **7.4.3** Show status on series and episode levels

## 📝 Notes

Series state and metadata will be stored and managed internally.
