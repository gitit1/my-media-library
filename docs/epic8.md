# Epic 8: Filesystem-Based Series Adding

## 🎯 Goal

Automate adding series from filesystem scan and handle mismatched metadata.

## 🏆 Status

⏳ Planned

## ✅ Tasks

### **Task 1 – Filesystem Scanner Service (Backend)**

-   **8.1** Create scanner service: `POST /scanner/scan/:pathId`
-   **8.2** Recursively scan folders for potential series
-   **8.3** Parse folder name → extract possible match name

---

### **Task 2 – TVDB Matching for Folder Names**

-   **8.2.1** Call `/thetvdb/search` with folder name
-   **8.2.2** Return possible matches to user
-   **8.2.3** Let user confirm match manually or reject

---

### **Task 3 – Save Confirmed Series from Scan**

-   **8.3.1** Save matched Series/Seasons/Episodes to DB
-   **8.3.2** Trigger folder creation for missing episodes/seasons
-   **8.3.3** Download posters, icons

---

### **Task 4 – Handle Unmatched Series**

-   **8.4.1** Save to `unmatched_series` table
-   **8.4.2** Show them in `/series/actions/unmatched`
-   **8.4.3** Allow retry or manual match later

---

### **Task 5 – Reflect Scan Results in Dashboard**

-   **8.5.1** Add “Scanned” status or tag
-   **8.5.2** Update subtitle/watching/missing counts
-   **8.5.3** Add notifications if any new items found

## 📝 Notes

Filesystem scanning ensures that local files are reflected in the series dashboard.
