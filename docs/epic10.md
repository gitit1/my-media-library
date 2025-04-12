# Epic 10: Plex Integration

## 🎯 Goal

Allow syncing of series metadata and watch status from Plex.

## ✅ Tasks

-   Establish Plex connection and token handling.
-   Sync metadata and watch status from Plex.
-   Resolve conflicts between Plex and internal state.

## 🏆 Status

⏳ Planned

## 📝 Notes

Plex sync will provide real-time state updates and conflict resolution.

Series should not be manually marked as "linked to Plex." This linkage should happen automatically:

If a series has a local path and Plex is running, it will eventually appear in the Plex library.

If a series is virtual (not saved locally), it will never be linked to Plex.

The logic for detecting Plex-linked series and handling synchronization belongs fully in this integration epic.

Series linkage will be verified post-save and updated during metadata sync or scanning.
