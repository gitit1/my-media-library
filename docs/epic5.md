# Epic 5: Manage Paths

## 🎯 Goal

Let the user **define, modify, and manage filesystem paths** for storing and scanning series.

## 🏆 Status

⏳ Planned

## ✅ Tasks

### Task 1 – Create Database Table for Paths

-   **1.1** Design Path Entity

    -   Fields: `id`, `pathString`, `type` (“Series”, “Movies”, etc.), `enabled`, `createdAt`, `updatedAt`.
    -   Use TypeORM with `Path.entity.ts`.

-   **1.2** Setup Relationship (Optional)
    -   If multi-user in future, you might include a `userId` foreign key.
    -   Single-user → keep it minimal.

#### Implementation Notes

-   Use migrations or auto-sync to create the `paths` table.
-   Store in the same DB as your series.

---

### Task 2 – Create Paths Controller & Service (Backend)

-   **2.1** `POST /paths`

    -   Accept `pathString`, `type`.
    -   Validate path if needed.
    -   Store in DB.

-   **2.2** `GET /paths`

    -   Return array of all paths (`enabled`, `type`, etc.).

-   **2.3** `PATCH /paths/:id`

    -   Modify an existing path’s `type`, `pathString`, or `enabled`.
    -   Re-validate path if needed.

-   **2.4** `DELETE /paths/:id`
    -   Remove path from DB.
    -   (Optional) Ask if user wants to delete the folder on disk.

#### Implementation Notes

-   Optionally confirm the folder exists for each add/update.
-   `PathsService` for DB logic; `PathsController` for endpoints.

---

### Task 3 – Create UI for Managing Paths

-   **3.1** Page at `settings/paths/`

    -   List existing paths in a table or list.
    -   Show `pathString`, `type`, `enabled`, plus edit/delete buttons.

-   **3.2** “Add Path” Form

    -   Simple modal or new page to input a path.
    -   Let user pick `type` from a dropdown (Series, Movies, etc.).
    -   Validate or test the path with an API call if desired.

-   **3.3** “Edit Path” Action

    -   Let user change `type` or rename the path.
    -   Toggle `enabled` on/off.

-   **3.4** “Delete Path” Action
    -   Confirm deletion pop-up.
    -   Call `DELETE /paths/:id`.

#### Implementation Notes

-   Use **custom UI components** (Buttons, Modals, etc.).
-   Future expansions (like advanced scanning rules) can go here.

---

### Task 4 – Handle Path Status

-   **4.1** Add `enabled` in `Path` entity

    -   Default to `true`.

-   **4.2** Reflect Status in UI

    -   Show a checkbox or switch in the table row.
    -   Call `PATCH /paths/:id` to update.

-   **4.3** Use Only “Enabled” Paths for Scanning
    -   In the scanner (Epic 8), ignore disabled paths.
    -   Log or skip them in your scanning logic.

#### Implementation Notes

-   Disabling a path means “don’t scan,” but user wants to keep it in DB.

---

## Notes

-   **Epic 5** is purely about **path management**—actual scanning is in **Epic 8**.
-   This ensures you have a DB table and UI for user-defined paths.
