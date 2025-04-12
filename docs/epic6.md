# Epic 6: Manual Data Input & Database

## 🎯 Goal

Allow users to manually enter and manage series data and store it in the database.

## 🏆 Status

⏳ Planned

## ✅ Tasks

### **Task 1 – Search & Confirm Series from TheTVDB**

-   **6.1.1** Create Search UI in `/series/actions/add`
-   **6.1.2** Call `/thetvdb/search?query=...` on input
-   **6.1.3** Expand result on click with `/thetvdb/extended/:id?full=false`
-   **6.1.4** Let user select artwork (poster, banner, icon)

---

### **Task 2 – Confirm Match & Save to Database**

-   **6.2.1** Call `/thetvdb/extended/:id?full=true`
-   **6.2.2** Prompt user to select filesystem path
-   **6.2.3** Send `POST /series` with full data
-   **6.2.4** Save Series + Seasons + Episodes to DB

---

### **Task 3 – Support Virtual Series Lifecycle**

> Handle series that are not linked to a local folder, and allow connecting them later.

-   **6.3.1** Add `isVirtual` column to `Series` entity (`default: false`)
-   **6.3.2** Allow `pathId` to be nullable in DB schema
-   **6.3.3** Add checkbox in UI: “This series is not saved locally”
-   **6.3.4** Skip scan logic on save if `isVirtual = true`
-   **6.3.5** In Saved Series view, show “Link to Filesystem” button
-   **6.3.6** Create modal to select path
-   **6.3.7** Create `PATCH /series/:id` to update `pathId` and set `isVirtual = false`
-   **6.3.8** Trigger scanner after linking

---

### **Task 4 – Trigger Filesystem & Scanner After Add**

> When a new series is added (not virtual), we simulate or trigger scan logic.
> This may include building a skeleton of folders and episode files — not just checking for missing episodes.

-   **6.4.1** Trigger (stubbed) scan for new series added
-   **6.4.2** Display scan progress (stubbed placeholder)
-   **6.4.3** Redirect user to new series page

## 📝 Notes

Manual input allows the user to override missing metadata or incomplete sync.
Also supports tracking "virtual" series without local files.
