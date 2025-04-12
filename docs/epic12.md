# Epic 12: Notifications System

## 🎯 Goal

Ensure a scalable, real-time, and modular notification system for tracking important changes and alerts across the app.

## ✅ Tasks

### Task 1 – Define Notification Types

-   Missing episodes
-   Missing subtitles
-   New episodes available
-   Sync errors (Plex/OpenSubtitles)
-   Series status changes (e.g., ended)

### Task 2 – Notification Table Schema

-   Create DB entity with:
    -   `type`
    -   `message`
    -   `timestamp`
    -   `isRead`
    -   `relatedSeriesId`, `relatedEpisodeId`, etc.
-   Add indexing and relations

### Task 3 – Trigger Notifications (Backend)

-   From scanner service (missing data)
-   From Plex/OpenSubtitles sync
-   From TVDB sync events
-   Store + return via API

### Task 4 – Display Notifications (Client)

-   Page at `/meta/notifications`
-   Show grouped list with icons/severity
-   Add filters (e.g., Unread, Warnings)

### Task 5 – Mark As Read / Dismiss

-   Dismiss via button
-   Persist to DB (or local state if real-time)

### Task 6 – (Optional) Real-Time Push

-   Use polling or WebSocket integration
-   Trigger updates in Dashboard or Notification Page

## 🏆 Status

⏳ Planned

## 📝 Notes

The notification system will unify alerts from all parts of the app and become part of the Dashboard + global state in future versions.
