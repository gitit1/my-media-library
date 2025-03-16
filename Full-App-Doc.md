# 📺 My-Media-Library — Master Project Document (Consolidated & Detailed)

## 🎯 **Project Overview**
My-Media-Library (MML) is a comprehensive media management application designed to replace Sonarr and Excel for managing TV series. It integrates with Plex, TheTVDB, and OpenSubtitles to provide a seamless experience for tracking, organizing, and updating series data.

### **Goals**
- Replace Sonarr and Excel for managing media collections
- Deep integration with Plex, TheTVDB, and OpenSubtitles
- Automated + manual control over:
  - Series tracking
  - Episode tracking
  - Subtitles (including language preferences)
  - Watch statuses (synced with Plex)
- Fully scalable microservice-based backend (NestJS) & modern frontend (Next.js + React)
- Clean, modular, & scalable architecture

---

## 🏗️ **High-Level Project Structure**

```bash
my-media-library/
├── client/               # Next.js Frontend
│   └── src/
│       ├── app/          # Pages (Next.js App Router)
│       │   ├── series/   # Series-based pages
│       │   │   ├── add/          # Add new series
│       │   │   ├── dashboard/    # Series dashboard
│       │   │   ├── confirm/      # Confirm match
│       │   │   ├── saved/        # Saved series list
│       │   │   ├── unmatched/    # Unmatched series
│       │   ├── settings/         # Settings pages
│       │   │   ├── paths/        # Manage file paths
│       │   ├── shared/           # Shared UI components (Button, Modal, Card, etc.)
│       ├── components/           # Extra UI components
│       ├── services/             # API integrations
│       ├── hooks/                # React hooks (data fetching, state)
│       ├── types/                # TypeScript types
│       └── utils/                # Utility functions
│
├── server/               # NestJS Backend
│   └── src/
│       ├── controllers/  # REST controllers (scanning, series, subtitles)
│       ├── services/     # Business logic (scanner, plex integration, etc.)
│       ├── modules/      # Feature modules
│       ├── entities/     # Database entities (Series, Season, Episode, etc.)
│       ├── types/        # Shared/custom TS types
│       └── lib/          # Additional utilities/helpers
│
└── scripts/              # Cron jobs, background tasks
```

---

## 🌐 **Tech Stack**
### **Frontend**
- **Framework**: Next.js (App Router)
- **Languages**: React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **API**: Axios

### **Backend**
- **Framework**: NestJS
- **Languages**: TypeScript, Node.js
- **Database**: PostgreSQL
- **Cron**: Node.js tasks

### **Integrations**
- **TheTVDB** → metadata
- **OpenSubtitles** → subtitles
- **Plex** → watch status, tags, library sync

---

## 🎯 **Full Feature Breakdown**

### **Adding Series**
#### **Method 1: From Filesystem Scan**
1. Scan filesystem for new series
2. Match folder names to TheTVDB
3. Prompt user for confirmation
4. Save metadata to database
5. Create missing folders and download posters

#### **Method 2: From Manual Search**
1. User searches for a series using TheTVDB
2. Display possible matches
3. User confirms correct match
4. Save metadata and episodes to database
5. Trigger filesystem scan for missing episodes

---

### **Scanner Types**
#### **Quick Scan**
- Fast file check
- Detects new/missing episodes and subtitles
- Syncs metadata from TheTVDB and Plex

#### **Full Scan**
- Deep metadata scan
- Confirms and links correct metadata from TheTVDB
- Triggers after user confirmation

---

### **Manage Paths**
- User can add multiple folder paths
- Each path can be scanned using Quick/Full
- UI in `settings/paths/` to enable/disable paths, remove them, or set advanced scan rules

---

### **File Handling**
- Recursive scanning for episodes
- Support multiple file paths
- Match files to TheTVDB (IDs)
- Track file status (found, missing, renamed)
- Rename/delete based on metadata
- Auto-detect new/missing files → reflect in UI
- Handle various extensions & subtitles

### **Subtitle Management**
- Track subtitle status (with-subs, mixed, no-subs)
- Manual overrides
- Integration w/ OpenSubtitles
- Hebrew `.heb` rename triggers
- Mark episodes "subbed"
- UI for managing subs

### **Viewing Status**
- Watch statuses (Watching, Need to Continue, etc.)
- Reflect in UI (color coding/icons)
- Manual or auto updates
- Separate by episode vs. series
- Last-watched episode
- Sync w/ Plex

### **File Movement**
- Move files on status changes
- Dialog for destination folder
- Update path & metadata
- Success/error notifications
- Manual/auto rename

### **Missing Episodes + Cron**
- Background jobs
- Sync w/ TheTVDB for new/missing
- Show missing in UI
- Mark new episodes "unwatched"
- Manual refresh/scan

### **Database Design**
- `series`, `season`, `episode`
- Store subtitle & watch status
- Store file path for movement & sync
- Updatable from TheTVDB

### **Frontend UI**
- **Dashboard**: show all series (filters, missing/new), manual refresh
- **Series View**: seasons/episodes, quick updates
- **Episode View**: direct path opening, manual metadata refresh
- **Settings**: add/remove paths, toggles, cron intervals, language preference
- **Manage Paths**: specify path scanning methods (Quick vs. Full)

### **Microservice Structure**
- **File Handling** → scanning, moves, renaming
- **Metadata** → TheTVDB data
- **State** → watch/subtitle state
- **Notification** → missing/new episodes, real-time UI

### **Match Confirmation**
- After scanning → confirm or reject matches
- If confirmed → store TheTVDB ID
- If rejected → manual fix

### **Refresh/Scan Button**
- Manual refresh in UI
- Compare local vs. TheTVDB
- Show results

### **Plex Integration**
- Connect w/ Plex token
- Sync watch status, tags, library
- Conflicts & push updates
- Real-time sync

### **OpenSubtitles Integration**
- Detect missing subs
- Show user available subs
- Download & auto-update DB

### **Filtering**
- Filter by status, subtitles, missing episodes, year, language, file type, tags

### **Custom File Types + Tags**
- Predefined: Telenovela, Cartoon, etc.
- User-defined: "K-Drama", "Anime"
- Tag examples: "For Kids", "Rewatch"
- Sync w/ Plex tags (optional)

### **Stretch Goals**
- Streaming in app
- Transcoding
- Multi-user profiles
- Recommendations
- Sync w/ Plex library
- Dark Mode

---

## 🏆 **Epics (Git-Based)**
*(Each subtask = commit + doc update)*

### **Epic 1: Git & Project Creation**
1. **Create Git repository + initial commit**  
2. **Baseline Next.js + NestJS structure**  
3. **Env configs + basic README**

### **Epic 2: Documentation**
1. **Master Doc, readme, project docs**  
2. **Outline approach**

### **Epic 3: UI**
1. **Base pages** → Dashboard, Series, Episode, Settings, Manage Paths, Add Series, Confirm  
2. **Filtering + color-coding**  
3. **Shared components** → Button, Modal, Card  
4. **State handling** → React Context + SWR

### **Epic 4: Manual Data Input & Database**
1. **DB schema** (Series, Season, Episode)  
2. **Manual input form** (series/episodes)  
3. **Save metadata** from TheTVDB

### **Epic 5: FileSystem Handling (Scanner)**
1. **Implement scanning** (Quick vs. Full)  
2. **File renaming, moves, deletions**  
3. **Missing episodes + placeholders**  
4. **Match confirmation**  
5. **Refresh/Scan button**

### **Epic 6: Subtitle Management**
1. **OpenSubtitles integration**  
2. **Subtitle statuses** (with-subs, mixed, no-subs)  
3. **Hebrew rename** to .heb  
4. **UI** for subs

### **Epic 7: Plex Integration**
1. **Connect to Plex** (token)  
2. **Sync** watch status, tags, library  
3. **Resolve conflicts** & push updates

### **Epic 8: Viewing Status & File Movement**
1. **Manage watch statuses** (Watching, Need to Continue, etc.)  
2. **Track last-watched** episode  
3. **Auto/manual file moves**

### **Epic 9: Advanced Features & Filtering**
1. **Filter** by status, subtitles, missing, year, language, etc.  
2. **Custom file types** & tags  
3. **Microservices** for File/Metadata/State/Notification

### **Epic 10: Final Cleanup & Stretch Goals**
1. **Missing episodes cron job**  
2. **Error handling** & performance  
3. **Streaming, multi-user, dark mode**

---

This version includes:
- **Add Series** (both local scan + TheTVDB search),
- **Scanner Types** (Quick vs. Full) in detail,
- **Manage Paths** references in structure & features,
- Thorough Epics with sub tasks referencing commits + doc updates.

**Ready** for the methodical, step-by-step rebuild!

