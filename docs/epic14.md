# Epic 14: Make App Installable as Local Software

## 🎯 Goal

Turn My-Media-Library into a desktop/web app that users can run locally, with persistent settings and a friendly setup flow.

## ✅ Tasks

### Task 1 – Local-First Configuration Flow

-   Show Settings Page on first launch
-   User chooses:
    -   Root media path
    -   Preferred language
    -   Subtitle options
    -   Plex/OpenSubtitles tokens
-   Save to `.local.json` or DB settings table

### Task 2 – Local DB Initialization

-   Support SQLite or PostgreSQL for local installs
-   DB auto-setup with schema creation on first run
-   User input for optional DB config

### Task 3 – Git Versioning + Releases

-   Create tags in Git for stable versions (v1.0.0, etc.)
-   Add GitHub release notes with changelogs
-   Add `scripts/release.ts` if needed

### Task 4 – Packaged App Support

-   Optional: Wrap with Electron or Tauri
-   Allow single-click installs (Windows/Mac/Linux)

### Task 5 – Offline Mode Support

-   Detect if user wants local-only (no Plex or subtitles API)
-   App runs with just manual input + filesystem scan

## 🏆 Status

⏳ Planned

## 📝 Notes

This epic prepares the project to be usable by end-users without requiring dev knowledge or server hosting.
