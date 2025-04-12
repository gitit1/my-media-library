# 📺 My-Media-Library — Master Project Document (Consolidated & Detailed)

## 🎯 Project Overview

My-Media-Library (MML) is a comprehensive media management application designed to replace Sonarr and Excel for managing TV series.
It integrates with Plex, TheTVDB, and OpenSubtitles to provide a seamless experience for tracking, organizing, and updating series data.

### Goals

-   Replace Sonarr and Excel for managing media collections
-   Deep integration with Plex, TheTVDB, and OpenSubtitles
-   Automated + manual control over:
    -   Series tracking
    -   Episode tracking
    -   Subtitles (including language preferences)
    -   Watch statuses (synced with Plex)
-   Fully scalable microservice-based backend (NestJS) & modern frontend (Next.js + React)
-   Clean, modular, & scalable architecture

---

## 🏗️ High-Level Project Structure

```bash
my-media-library/
├── client/
│   └── src/
│       ├── app/
│       │   ├── pages/
│       │   │   ├── dashboard/
│       │   │   │   └── page.tsx                  # ✅Homepage
│       │   │   ├── series/
│       │   │   │   ├── actions/
│       │   │   │   │   ├── add/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── confirm/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── scanner/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── unmatched/
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── views/
│       │   │   │   │   ├── saved/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── statistics/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── page.tsx
│       │   │   │   │       └── [episode]/
│       │   │   │   │           └── page.tsx
│       │   │   ├── meta/
│       │   │   │   ├── tags/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── collections/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── types/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── notifications/
│       │   │   │       └── page.tsx
│       │   │   └── settings/
│       │   │       ├── page.tsx
│       │   │       ├── paths/
│       │   │       │   └── page.tsx
│       │   └── shared/           # Shared UI components (Button, Modal, Card, etc.)
│       ├── components/           # Extra UI components
│       ├── services/             # API integrations
│       ├── hooks/                # React hooks (data fetching, state)
│       ├── types/                # TypeScript types
│       └── utils/                # Utility functions
│
├── server/               # NestJS Backend
│   └── src/
│       ├── controllers/  # REST controllers (scanning, series, subtitles)
│       ├── services/     # Business logic (scanner, Plex integration, etc.)
│       ├── modules/      # Feature modules
│       ├── entities/     # Database entities (Series, Season, Episode, etc.)
│       ├── types/        # Shared/custom TS types
│       └── lib/          # Additional utilities/helpers
│
└── scripts/              # Cron jobs, background tasks
```

---

## 🌐 Tech Stack

### Frontend

-   **Framework:** Next.js (App Router)
-   **Languages:** React, TypeScript
-   **Styling:** Tailwind CSS, Shadcn/UI
-   **API:** Axios

### Backend

-   **Framework:** NestJS
-   **Languages:** TypeScript, Node.js
-   **Database:** PostgreSQL
-   **Cron:** Node.js tasks

### Integrations

-   **TheTVDB:** Metadata
-   **OpenSubtitles:** Subtitles
-   **Plex:** Watch status, tags, library sync

---

## 🎯 Full Feature Breakdown

## 🏷️ Collections and Types

### 📚 Collections

-   Each collection should have a unique ID (to be stored in the database).
-   **Collection Types:**
    -   **Network** → From TheTVDB (e.g., Prime, CBS, Disney)
    -   **Series State** → From TheTVDB (e.g., Ended, Running)
    -   **Viewing State** →
        -   Ended - Watched (**viewing-state-001**)
        -   Ended - Need to Continue (**viewing-state-002**)
        -   Ended - Want to Watch (**viewing-state-003**)
        -   Ended - Stop Following (**viewing-state-004**)
        -   Running - Watching (**viewing-state-005**)
        -   Running - Need to Continue (**viewing-state-006**)
        -   Running - Want to Watch (**viewing-state-007**)
        -   Running - Stop Following (**viewing-state-008**)
    -   **Franchise** → Not displayed in dashboard, but stored (e.g., 9-1-1 Shows, Chicago Shows)
    -   **World** → Arrowverse (**world-001**), DC (**world-002**), Marvel (**world-003**)
    -   **Subtitle Status** → With Subs (**subs-1**), No Subs (**subs-2**), Mixed Subs (**subs-3**), Hebrew (**subs-4**), Spanish (**subs-5**), Japanese (**subs-6**)
    -   **Other** → Mini Series (**other-001**), Open Ending (**other-002**)
-   Each item in a collection is a **tag**.
-   **UI Implementation Note:**
    -   Collections will be implemented as a dedicated tab within the Saved Series page, with basic CRUD (add, edit, delete) operations.
    -   Users can filter collections by type.
    -   These pages are available in `/meta/collections`, `/meta/tags`, and `/meta/types` (if separated).

---

### 🎭 Types

-   Each type is a distinct kind of series (linked to a Plex library).
-   **Series Types:**
    -   Series (**type-001**)
    -   Cartoon (**type-002**)
    -   Israeli Show (**type-003**)
    -   Telenovela (**type-004**)
    -   Spanish Series (**type-005**)
    -   Japanese Series (**type-006**)
    -   Other (**type-007**)
-   Users should be able to define additional types.
-   Plex should reference these as different libraries.

---

### 🎯 Goal:

-   Collections and Types should be tightly integrated into the metadata system, with collection types and series types used for filtering and organizing series in the app.
-   Collections and types should sync with Plex where applicable.
-   Franchise and World should be stored but not displayed directly in the dashboard.

---

## 🔔 Notifications

-   Notifications are stored and displayed via a dedicated UI page: `/meta/notifications`
-   They include:
    -   Missing episodes
    -   Missing subtitles
    -   New episodes available
    -   Series status updates (e.g. ended/running)
-   Each notification includes:
    -   Type (missing episode, subtitle, etc.)
    -   Affected series or episode
    -   Quick actions (e.g., mark read, rescan, open series)
-   Future:
    -   Grouping by type
    -   Severity indicators
    -   Automatic removal on resolve

---

### Adding Series

#### Method 1: From Filesystem Scan

1. Scan filesystem for new series
2. Match folder names to TheTVDB
3. Prompt user for confirmation
4. Save metadata to database
5. Create missing folders and download posters

#### Method 2: From Manual Search

1. User searches for a series using TheTVDB
2. Display possible matches
3. User confirms correct match
4. Save metadata and episodes to database
5. Trigger filesystem scan for missing episodes

### Scanner Types

#### Quick Scan

-   Fast file check
-   Detects new/missing episodes and subtitles
-   Syncs metadata from TheTVDB and Plex

#### Full Scan

-   Deep metadata scan
-   Confirms and links correct metadata from TheTVDB
-   Triggers after user confirmation

### Manage Paths

-   User can add multiple folder paths
-   Each path can be scanned using Quick/Full
-   UI in `settings/paths/` to enable/disable paths, remove them, or set advanced scan rules

### File Handling

-   Recursive scanning for episodes
-   Support multiple file paths
-   Match files to TheTVDB (IDs)
-   Track file status (found, missing, renamed)
-   Rename/delete based on metadata
-   Auto-detect new/missing files → reflect in UI
-   Handle various extensions & subtitles

### Subtitle Management

-   Track subtitle status (with-subs, mixed, no-subs)
-   Manual overrides
-   Integration w/ OpenSubtitles
-   Hebrew `.heb` rename triggers
-   Mark episodes "subbed"
-   UI for managing subs

### Viewing Status

-   Watch statuses (Watching, Need to Continue, etc.)
-   Reflect in UI (color coding/icons)
-   Manual or auto updates
-   Separate by episode vs. series
-   Last-watched episode
-   Sync w/ Plex

### File Movement

-   Move files on status changes
-   Dialog for destination folder
-   Update path & metadata
-   Success/error notifications
-   Manual/auto rename

### Missing Episodes + Cron

-   Background jobs
-   Sync w/ TheTVDB for new/missing
-   Show missing in UI
-   Mark new episodes "unwatched"
-   Manual refresh/scan

### Database Design

-   `series`, `season`, `episode`
-   Store subtitle & watch status
-   Store file path for movement & sync
-   Updatable from TheTVDB

### **Microservice Structure**

-   **File Handling** → scanning, moves, renaming
-   **Metadata** → TheTVDB data
-   **State** → watch/subtitle state
-   **Notification** → missing/new episodes, real-time UI

### **Match Confirmation**

-   After scanning → confirm or reject matches
-   If confirmed → store TheTVDB ID
-   If rejected → manual fix

### **Refresh/Scan Button**

-   Manual refresh in UI
-   Compare local vs. TheTVDB
-   Show results

### **Plex Integration**

-   Connect w/ Plex token
-   Sync watch status, tags, library
-   Conflicts & push updates
-   Real-time sync

### **OpenSubtitles Integration**

-   Detect missing subs
-   Show user available subs
-   Download & auto-update DB

### **Filtering**

-   Filter by status, subtitles, missing episodes, year, language, file type, tags

### **Custom File Types + Tags**

-   Predefined: Telenovela, Cartoon, etc.
-   User-defined: "K-Drama", "Anime"
-   Tag examples: "For Kids", "Rewatch"
-   Sync w/ Plex tags (optional)

### **Stretch Goals**

-   Streaming in app
-   Transcoding
-   Multi-user profiles
-   Recommendations
-   Sync w/ Plex library
-   Dark Mode

---

## 🏆 Epics Overview

<details>
  <summary><strong>Epic 1: Git & Project Creation</strong></summary>
  
  **Goal:**  
  Establish the project's foundation by setting up the repository and initial project structure.

**Tasks Completed:**

-   Created the Git repository and performed the initial commit.
-   Established the baseline structure for the Next.js (client) and NestJS (server) projects.
-   Configured environment variables and added a basic README.

**Status:**  
 ✅ Completed

</details>

<details>
  <summary><strong>Epic 2: Documentation</strong></summary>

**Goal:**  
 Ensure that all project documentation is comprehensive, up-to-date, and well-organized.

**Tasks:**

-   **Review & Update Master Project Document**

    -   Compare current content with recent changes.
    -   Update sections to reflect new scanning logic, manual data input, and integration points.
    -   Ensure that the epics and milestones are correctly documented.

-   **Enhance the README**

    -   Provide a clear project overview.
    -   Include setup instructions (dependencies, environment variables, running client/server).
    -   Summarize basic usage (e.g., adding a series, scanning vs. manual input).

-   **Create/Update the `/docs` Folder**

    -   Add subsystem-specific documentation (e.g., `docs/thetvdb.md`, `docs/plex.md`, `docs/opensubtitles.md`, `docs/filesystem.md`, `docs/env-variables.md`).
    -   Create epic-specific docs (e.g., `docs/epic1.md`, `docs/epic2.md`, etc.) detailing the goals, tasks, and status for each epic.

-   **Create High-Level Architecture Diagrams**

    -   Create a sequence diagram showing the flow of data (frontend ↔ backend ↔ Plex ↔ TVDB ↔ filesystem).
    -   Include a data flowchart to visualize series input, subtitle fetching, and syncing.

-   **Document Git Workflow**
    -   Explain how to link issues to commits (e.g., using “Closes #X” in commit messages).
    -   Detail the process for maintaining a clean Git history.

**Status:**  
 🟡 In Progress

</details>

<details>
  <summary><strong>Epic 3: UI</strong></summary>

**Goal:**  
 Develop a robust and intuitive user interface for managing series, episodes, subtitles, and file movements.

**Tasks:**

-   **Create Design System with Theme**

    -   Create a theme system with light/dark mode support.
    -   Define color tokens, spacing, and typography rules.
    -   Build reusable components:
        -   Button
        -   Modal
        -   Card
    -   Ensure consistent styling with Tailwind.

-   **Create High-Level Pages**

    -   Create high-level pages:
        -   Dashboard
        -   Series
        -   Create Single-Series
        -   Episode
        -   Unmatched Series
        -   Notifications
        -   Settings
        -   Manage Paths
        -   Statistics
        -   Scanner
    -   Finalize the structure after initial testing and feedback.

-   **State Management**

    -   Use React Context for shared state.
    -   Store fetched series data in state using SWR.
    -   Allow real-time state updates.

-   **Global Error Boundary**

    -   Create a React ErrorBoundary component.
    -   Display fallback UI when errors occur.
    -   Log errors for debugging.

-   **Store Dark/Light Mode in Local Storage**

    -   Store user preference in local storage.
    -   Ensure persistence across sessions.
    -   Reflect mode changes dynamically.

-   **Define Component Structure**

    -   Create `components/` directory.
    -   Organize UI components logically.
    -   Create hooks for shared logic.

-   **Ensure Accessibility (a11y) Compliance**

    -   Follow WCAG color contrast guidelines.
    -   Add ARIA roles for dynamic content.
    -   Implement focus state handling.

-   **Add Metadata & SEO Handling**

    -   Create `next/head` defaults for metadata.
    -   Add OpenGraph metadata for social sharing.
    -   Ensure dynamic metadata updates.

-   **Create Global Loading State** - Create a loading spinner component.

    -   Handle loading state globally.
    -   Reflect loading status in UI.

    **Status:**  
     ⏳ Planned

    **Notes:**  
     This epic focuses on ensuring the frontend is modular, consistent, and scalable.
    </details>

<details>
  <summary><strong>Epic 4: Setup Database + TVDB Integration</strong></summary>

**Goal:**  
 Prepare the foundation for storing series and metadata by setting up the database and TVDB connection.

**Tasks:**

-   **Define Database Schema**

    -   Design tables for Series, Season, and Episode.
    -   Include fields for:
        -   Series status
        -   Subtitle status
        -   Plex integration status
        -   File path

-   **Create Database Models**

    -   Create TypeORM (or equivalent) models for Series, Season, and Episode.
    -   Establish relationships between models (e.g., Series → Season → Episode).

-   **Set Up TVDB API Integration**

    -   Create backend service to connect to TheTVDB API.
    -   Handle authentication and token refresh.

-   **Create TVDB Search Endpoint**

    -   Create a backend route to search for series using TheTVDB.
    -   Return a list of possible matches to the client.

-   **Handle TVDB Conflicts**
    -   Handle cases where the series already exists in the database.
    -   Support linking mismatched data.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic sets up the backend foundation needed for all future series management.

</details>

<details>
  <summary><strong>Epic 5: Manage Paths</strong></summary>

**Goal:**  
 Allow the user to define, modify, and manage filesystem paths for series storage and scanning.

**Tasks:**

-   **(Client) Create UI for Managing Paths**

    -   Create UI for adding and modifying filesystem paths.
    -   Display list of existing paths.

-   **(Server) Create Paths Table**

    -   Create a table for storing paths in the database.
    -   Include fields for path type (e.g., Series, Movies).

-   **(Server) Add New Path**

    -   Create backend route to add a new path.
    -   Validate path existence on filesystem.

-   **(Server) Modify Path**

    -   Create backend route to modify an existing path.
    -   Allow changing path type.

-   **(Server) Delete Path**

    -   Create backend route to delete a path.
    -   Clean up references to deleted paths.

-   **(Client) Handle Path Status**
    -   Allow user to enable/disable specific paths.
    -   Display status (active/inactive).

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic sets up the foundation for scanning and file management.

</details>

<details>
  <summary><strong>Epic 6: Manual Data Input & Database</strong></summary>

**Goal:**  
 Allow users to manually enter and manage series data and store it in the database.

**Tasks:**

-   **(Client) Create Series Search UI**

    -   Create search field to look up series using TheTVDB.
    -   Display possible matches and allow the user to confirm a match.

-   **(Server) Handle Series Search with TheTVDB**

    -   Create backend route to search TheTVDB using user input.
    -   Return a list of possible matches to the client.

-   **(Client) Ask for Filesystem Location**

    -   After confirming a match → Prompt the user to select the filesystem location.
    -   Save the selected path.

-   **(Server) Save Metadata to Database**

    -   Save full metadata (series, seasons, and episodes) to the database after confirmation.
    -   Handle conflicts if series already exists.

-   **(Client) Trigger Filesystem Scan**

    -   After saving metadata → Trigger filesystem scan for missing episodes.
    -   Display scan status to the user.

-   **(Client) Ask if Linked to Plex**
    -   After saving metadata → Ask the user if the series is already linked to Plex.
    -   If yes → Store Plex link status (handle syncing in a separate Plex epic).

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on building the foundation for storing and managing series and episode data.

</details>

<details>
  <summary><strong>Epic 7: Series Management</strong></summary>

**Goal:**  
 Build the data-driven logic for managing series, episodes, and status.

**Tasks:**

-   **(Client) Create Dashboard for Series Tracking**

    -   Display all tracked series in a central location.
    -   Show watching status, missing episodes, and subtitle status.
    -   Highlight missing data using color-coding.

-   **(Server) Provide Series Data**

    -   Create backend route to provide series data to the client.
    -   Include series metadata, watch status, and subtitle status.

-   **(Client) Add Filtering & Color-Coding**

    -   Filter by watching status (Watching, Completed, Unwatched).
    -   Filter by subtitle status (With, Without, Mixed).
    -   Highlight missing data with color coding.

-   **(Server) Provide Filtering Logic**

    -   Create backend route to return filtered series data.
    -   Allow filtering by subtitle status, series status, and watch status.

-   **(Client) Viewing Status Management UI**

    -   Allow user to change viewing status directly from the UI.
    -   Display icons for each watching status.

-   **(Server) Handle Status Updates**

    -   Update the database when the user changes the viewing status.
    -   Reflect the change in the next data sync.

-   **(Client) Manage Subtitle Status**

    -   Track subtitle status (with, mixed, without).
    -   Allow manual subtitle status changes.

-   **(Server) Handle Subtitle Status Updates**
    -   Update the database when the subtitle status changes.
    -   Reflect the change in the next data sync.
-   **(Server) Sync Custom Metadata**

    -   If tags/labels are changed after series data sync → Update internal state.
    -   Sync changes to Plex if Plex sync is enabled.

-   **(Client) Manual Metadata Refresh**

    -   Allow user to manually trigger metadata refresh from TVDB or Plex.
    -   Reflect updated data in the dashboard.

-   **(Server) Allow Partial Metadata Sync**

    -   If metadata from Plex or TVDB is incomplete → Allow user to override specific fields.

-   **(Client) Display Metadata Sync Status in Dashboard**
    -   Reflect metadata sync status in the series dashboard.
    -   Display a success or failure state after sync.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on handling series metadata and state.

</details>

<details>
  <summary><strong>Epic 8: Filesystem-Based Series Adding</strong></summary>

**Goal:**  
 Automate adding series from filesystem scan and handle mismatched metadata.

**Tasks:**

-   **(Client) Trigger Filesystem Scan**

    -   Create button in the UI to trigger filesystem scan.
    -   Display real-time scan status and progress.

-   **(Server) Scan Filesystem for New Series**

    -   Scan filesystem for new series folders.
    -   Detect mismatched or incomplete metadata.
    -   Return a list of detected series to the client.

-   **(Client) Display Detected Series**

    -   Display list of detected series in a confirmation UI.
    -   Allow user to confirm or reject detected matches.

-   **(Server) Match with TheTVDB**

    -   Attempt to match series folder names to TheTVDB.
    -   If multiple matches → Return possible options to client.
    -   If no match → Mark series as "Unmatched."

-   **(Client) Confirm Match or Manual Fix**

    -   Allow user to confirm match or manually fix metadata.
    -   If confirmed → Save metadata.
    -   If rejected → Mark as "Unmatched."

-   **(Server) Save Metadata + Create Folders**

    -   Save matched series to the database.
    -   Create empty folders for missing episodes and seasons.

-   **(Server) Download Posters**

    -   Download series poster from TheTVDB.
    -   Download season posters (if available).

-   **(Server) Handle Unmatched Series**

    -   If series cannot be matched → Store in "Unmatched" table.
    -   Allow future metadata sync.

-   **(Server) Handle File Movement**

    -   Allow user to manually move files.
    -   Create backend route to rename or delete files.
    -   Reflect file movement in the database.
    -   Allow direct path updates.

-   **(Client) Trigger File Movement**

    -   Add UI for manual file movement.
    -   Display status after file operation.

-   **(Server) Sync Metadata After File Movement**

    -   If file is manually moved or renamed → Update file path and metadata in the database.
    -   Reflect updated path in the dashboard.

-   **(Client) Reflect File Movement Status in Dashboard**
    -   After file is moved or renamed → Update file path and sync status in the dashboard.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on automating series management through filesystem scanning.

</details>

<details>
  <summary><strong>Epic 9: Subtitle Management</strong></summary>

**Goal:**  
 Automate subtitle management and provide manual controls for subtitle state.

**Tasks:**

-   **(Server) Detect Subtitle Status**

    -   After series is added → Detect existing subtitle files.
    -   Classify subtitle status as "With", "Mixed", or "No Subs."

-   **(Client) Display Subtitle Status in Dashboard**

    -   Display subtitle status in the series dashboard.
    -   Use color coding to reflect subtitle status.

-   **(Server) OpenSubtitles Integration**

    -   Create backend connection to OpenSubtitles API.
    -   Handle authentication and token refresh.
    -   Return list of available subtitles.

-   **(Client) Fetch and Confirm Subtitles**

    -   Allow user to manually trigger subtitle download.
    -   Display available subtitle options (if multiple exist).
    -   Allow user to confirm or reject the subtitle match.

-   **(Server) Save Subtitle Files to Filesystem**

    -   After confirmation → Download subtitle files.
    -   Save subtitle files in the correct episode folder.

-   **(Server) Rename Hebrew Subtitles to `.heb`**

    -   If subtitle language = Hebrew → Rename file to `.heb`.

-   **(Client) Manual Override of Subtitle Status**

    -   Allow user to manually update subtitle status.
    -   Update database state after user change.

-   **(Server) Reflect Subtitle State Updates**

    -   Update subtitle state in database after manual change.
    -   Reflect the update in the series dashboard.

-   **(Server) Cron Job for Missing Subtitles**

    -   Create a cron job to run at regular intervals.
    -   Check OpenSubtitles for newly available subtitles.
    -   If new subtitle is found → Automatically download and save to filesystem.
    -   Update subtitle state in the database.

-   **(Client) Multi-Language Subtitle Handling**
    -   If multiple subtitle tracks are available → Allow user to select preferred language.
    -   Save language preference for future subtitle downloads.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on both automatic subtitle handling and manual user control.

</details>

<details>
  <summary><strong>Epic 10: Plex Integration</strong></summary>

**Goal:**  
 Allow syncing of series metadata and watch status from Plex.

**Tasks:**

-   **(Client) Create Plex Settings Page**

    -   Create UI for setting up Plex connection.
    -   Allow user to input Plex token and server details.
    -   Test connection status.

-   **(Server) Handle Plex Connection**

    -   Create backend connection to Plex using Plex API.
    -   Store Plex token and connection details in the database.
    -   Handle token refresh.

-   **(Client) Manual Link to Plex**

    -   Allow user to manually link existing series to Plex.
    -   Display available Plex libraries for matching.
    -   Save link status in the database.

-   **(Server) Sync Metadata from Plex**

    -   Pull existing metadata from Plex.
    -   Sync episode data, watch status, and artwork.
    -   Handle conflicts with existing metadata.

-   **(Server) Sync Watch Status from Plex**

    -   Pull watch status from Plex.
    -   Update internal watch status in the database.
    -   Reflect updated status in the series dashboard.

-   **(Server) Sync Missing Data from Plex**

    -   Check Plex for missing episode or subtitle data.
    -   If available → Sync with internal state.
    -   Update database with missing data.

-   **(Client) Display Sync Status**

    -   Display Plex sync status on the series dashboard.
    -   Allow user to manually trigger a Plex sync.

-   **(Server) Handle Sync Conflicts**

    -   If conflicts between Plex and internal state → Show resolution options.
    -   Allow user to override Plex or internal state.

-   **(Server) Handle Plex Conflict Resolution**

    -   If Plex and internal state conflict → Show resolution options to user.
    -   Allow user to override Plex or internal state.

-   **(Client) Better Error Reporting for Failed Syncs**

    -   If Plex or TVDB sync fails → Display clear error and retry option.

-   **(Client) Display Sync Errors in Dashboard**
    -   If Plex or TVDB sync fails → Show error message in the dashboard.
    -   Provide option to retry the sync.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on syncing metadata and watch status from Plex and resolving conflicts.

</details>

<details>
  <summary><strong>Epic 11: Tags, Labels & Collections</strong></summary>

**Goal:**  
 Allow users to define custom tags and labels for better series organization and filtering.

**Tasks:**

-   **(Client) Create UI for Tags**

    -   Create UI for defining and assigning custom tags.
    -   Allow user to add or remove tags from series.

-   **(Server) Define Tags Table**

    -   Create table for storing custom tags.
    -   Allow linking between series and tags.

-   **(Client) Create Collections**

    -   Allow user to create collections of series based on tags or status.
    -   Example: "All K-Dramas" or "Unfinished Series."

-   **(Server) Define Collections Table**

    -   Create table for storing collections.
    -   Allow linking between series and collections.

-   **(Server) Sync with Plex Tags**

    -   If Plex sync is active → Pull tags from Plex.
    -   Match Plex tags with internal tag system.

-   **(Client) Add Filtering by Tags**

    -   Update existing filter to allow filtering by custom tags and collections.
    -   Display custom tags and collections in the dashboard.

-   **(Server) Reflect Tag and Collection Updates**
    -   Update series metadata when tags or collections are changed.
    -   Reflect changes in the next sync.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on adding custom metadata and improving series organization using tags and collections.

</details>

<details>
  <summary><strong>Epic 12: Notifications System</strong></summary>

**Goal:**  
 Ensure a scalable, real-time, and modular notification system for tracking important changes and alerts across the app.

**Tasks:**

-   **(Backend) Define Notification Types**

    -   Missing episodes
    -   Missing subtitles
    -   New episodes available
    -   Sync errors (e.g., Plex or OpenSubtitles)
    -   Series status changes (e.g., ended)

-   **(Database) Create Notification Table**

    -   Include type, timestamp, read status
    -   Link to series, season, episode when relevant

-   **(Backend) Trigger Notifications**

    -   On episode/season mismatch
    -   After scanner detects missing data
    -   When new subtitle or metadata is available

-   **(Client) Display Notifications in UI**

    -   In `/meta/notifications` page
    -   Show grouped by type
    -   Include filters, severity levels, and actions (e.g., “rescan,” “open series”)

-   **(Client) Real-Time Updates**

    -   Optional: Use polling or WebSocket layer for real-time notifications

-   **(Client) Dismiss / Mark as Read**
    -   UI interaction to dismiss or mark notifications as read

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic replaces the older cleanup epic. All cleanup work is moved to Epic 13.

</details>

<details>
  <summary><strong>Epic 13: Final Cleanup & Optimization</strong></summary>

**Goal:**  
 Improve system stability, performance, and maintainability.

**Tasks:**

-   **(Server) Improve Error Handling**

    -   Centralize error handling across backend services.
    -   Catch unhandled exceptions and log them.
    -   Add proper status codes for failed requests.

-   **(Client) Improve UI Error Handling**

    -   Display clear error messages to the user.
    -   Handle network errors and retries automatically.

-   **(Server) Optimize Filesystem Scan**

    -   Improve file scanning speed using parallel processing.
    -   Reduce filesystem locks and I/O conflicts.

-   **(Server) Optimize Subtitle Fetching**

    -   Reduce OpenSubtitles request frequency.
    -   Cache results where possible.

-   **(Server) Optimize Metadata Sync**

    -   Batch sync operations to reduce database load.
    -   Add smart caching to minimize redundant requests.

-   **(Client) Code Cleanup**

    -   Remove unused imports and legacy code.
    -   Simplify complex UI components.
    -   Improve type safety and PropTypes definitions.

-   **(Server) Code Cleanup**

    -   Remove unused endpoints and services.
    -   Simplify complex business logic.
    -   Improve TypeScript type coverage.

-   **(Server) Improve Logging and Monitoring**
    -   Add structured logging to backend services.
    -   Improve log filtering and searchability.
    -   Add monitoring for system health and failures.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on improving performance and ensuring system stability.

</details>

<details>
  <summary><strong>Epic 14: Make App Installable as Local Software</strong></summary>

**Goal:**  
 Turn My-Media-Library into a standalone desktop/web app that users can run on their own machines with local configuration.

**Tasks:**

-   **(DevOps) Versioning Support**

    -   Tag versions via Git (v1.0.0, v1.1.0, etc.)
    -   Prepare GitHub releases with changelogs

-   **(Client) Local Settings Page**

    -   Displayed automatically at first run
    -   User sets base paths, default language, subtitle preferences
    -   Store config in `.local.json` or DB settings table

-   **(Client) Local-Only Mode**

    -   Allow running without Plex or external APIs
    -   Only filesystem + manual input

-   **(Backend) Local DB Setup**

    -   Use SQLite or PostgreSQL local mode
    -   Allow user to bootstrap DB on first run

-   **(Backend) Configurable `.env` Generator**

    -   Guide user through `.env` creation wizard on first launch

-   **(Optional) Package Electron Wrapper**
    -   Wrap app with Electron or Tauri to run as a desktop app
    -   Create platform-specific builds (Windows/Mac/Linux)

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic prepares the project to be used by non-technical users as a standalone application.

</details>

<details>
  <summary><strong>Epic 15: Stretch Goals</strong></summary>

**Goal:**  
 Add optional enhancements to improve the user experience and expand functionality.

**Tasks:**

-   **(Client) Streaming Integration**

    -   Add support for direct streaming from the filesystem.
    -   Include playback controls (play, pause, skip).

-   **(Server) Transcoding Support**

    -   Allow transcoding for unsupported codecs.
    -   Handle real-time transcoding for streaming.

-   **(Client) Multi-User Profiles (Plex-Linked)**

    -   Allow user to create multiple profiles.
    -   Link internal profiles to Plex profiles (if Plex sync is active).
    -   Separate viewing status and series tracking by profile.

-   **(Server) Multi-User Handling**

    -   Create database structure for user profiles.
    -   Link series and metadata to specific profiles.
    -   Sync profile-specific data with Plex if available.

-   **(Client) Recommendations**

    -   Suggest series based on viewing history.
    -   Display recommendations in the dashboard.

-   **(Server) Recommendations Engine**

    -   Create a backend service for recommendation logic.
    -   Recommend series based on similar tags, viewing patterns, and metadata.

-   **(Client) Dark Mode**

    -   Add UI toggle for dark/light mode.
    -   Store user preference in local storage.

-   **(Client) Plex Library Sync**
    -   Sync Plex libraries to internal state.
    -   Allow manual or automatic sync.

**Status:**  
 ⏳ Planned

**Notes:**  
 This epic focuses on optional enhancements that improve user experience and extend functionality.

</details>

---

## Pages Overview

<details>
  <summary><strong>Dashboard Page</strong></summary>

# 📌 Dashboard Page Detailed Plan

## 🖥️ Overall Page Structure:

### Header Section (Top)

-   **Title:** "My Media Dashboard"
-   **Search Bar:** Quickly search series by name
-   **Settings Icon:** Link to settings page

### Horizontal Navigation (below header)

Quick Actions:

-   **Scan Filesystem** (Initiates filesystem scan)
-   **Add New Series** (Redirects to add series page)
-   **Add New Path** (Redirects to manage paths page)

### Main Content Area

-   **Left Navigation Sidebar:** Persistent navigation across all pages
-   **Central Dashboard Content:**
    -   Summary Widgets
    -   Notifications Area
    -   Tracked Series Table
    -   Quick-Access Areas (future enhancement)

---

## 📐 Detailed Breakdown by Section:

### 1. 🔝 Header Section

-   **Title:** "My Media Dashboard"
-   **Search Bar:** Quick search for series
-   **Settings Icon:** Link to settings

### 2. 📍 Horizontal Navigation

Quick-action buttons:

-   **Scan Filesystem**
-   **Add New Series**
-   **Add New Path**

### 3. 📊 Summary Widgets (Center)

Clickable widgets redirecting to filtered series views:

| Widget                      | Description                              | Redirect/filter page                         |
| --------------------------- | ---------------------------------------- | -------------------------------------------- |
| **Total Series**            | Total number of tracked series           | Shows all series                             |
| **Watching**                | Actively watching series                 | Series filtered by "Watching" status         |
| **Need to Continue**        | Series needing continuation              | Series filtered by "Need to Continue" status |
| **Watched, Stop Following** | Series watched and not followed anymore  | Series filtered by "Stop Following" status   |
| **Missing Subtitles**       | Episodes without subtitles               | Filtered episodes missing subtitles          |
| **Missing Episodes**        | Episodes identified as missing           | Filtered missing episodes                    |
| **Unmatched Series**        | Filesystem series not matched to TheTVDB | Unmatched series                             |

### 4. 📢 Notifications Area

Prominent notifications highlighting updates:

-   **New Subtitles Available:** Recent subtitle releases
-   **New Episodes Released:** Recently aired episodes
-   **Series Status Changes:** Updates like "Ended" or "New Season"
-   **User-specific Notifications (Future):** Reminders, recently viewed, latest completed series

### 5. 📋 Tracked Series Table

Detailed list of tracked series:

| Column              | Description                          | Actions                         |
| ------------------- | ------------------------------------ | ------------------------------- |
| **Poster**          | Thumbnail from TheTVDB               | Clicking opens details          |
| **Series Name**     | Series name (Hebrew/English)         | Opens detailed series page      |
| **Watch Status**    | Current watch status (icons/badges)  | Toggle directly                 |
| **Subtitle Status** | Subtitle availability (icons/badges) | Manage subtitles                |
| **Latest Episode**  | Recently aired/viewed episode        | Mark as watched or view details |
| **Quick Actions**   | Buttons (Edit, Refresh, Scan)        | Quick operations directly       |

-   **Additional Features:**
    -   Filter by watch/subtitle status
    -   Sorting by name, latest episodes
    -   Pagination/infinite scrolling (future enhancement)

### 6. 🚀 Quick-Access Areas (Future Enhancements)

-   **Favorites Section:** Navigate favorite series
-   **Recently Viewed:** Quick links to recent series
-   **Custom Collections/Tags:** User-defined series groups

---

## 🎨 UI/Visual Considerations:

-   Consistent design (Tailwind CSS + shadcn/ui)
-   Clear responsive layout
-   Immediate visibility for key information

---

## 🛠️ Technical Considerations (Next Steps):

-   **React Components:**
    -   Header, Navigation, Sidebar, SummaryWidgets, Notifications, SeriesTable
-   **API Endpoints Required:**
    -   Summary data (`GET /series/summary`)
    -   Notifications (`GET /notifications`)
    -   Series table data (`GET /series` with filters/sorting)
-   **State Management & Data Fetching:** SWR or React Query

---

## ⚠️ Special Consideration:

Since the Dashboard is the main page, the file at `app/page.tsx` (outside `pages`) can directly import and render the Dashboard component, serving as the application's root landing page.

</details>
