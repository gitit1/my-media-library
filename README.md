
# 📺 My-Media-Library

## 🎯 Project Overview
My-Media-Library (MML) is a comprehensive media management application designed to replace Sonarr and Excel for managing TV series.  
It integrates with Plex, TheTVDB, and OpenSubtitles to provide a seamless experience for tracking, organizing, and updating series data.

---

## 🚀 Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/my-media-library.git
   ```
2. **Install dependencies**:
   ```bash
   cd my-media-library
   npm install
   ```
3. **Set up environment variables**:
   - Create a `.env` file in the root directory:
     ```plaintext
     # Backend config
     DATABASE_URL="postgresql://user:password@localhost:5432/my-media-library"
     TVDB_API_KEY="your-tvdb-api-key"
     PLEX_TOKEN="your-plex-token"
     OPENSUBTITLES_API_KEY="your-opensubtitles-api-key"
     ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Access the app**:  
   - Open `http://localhost:3000` in your browser.  

---

## 📄 Project Documentation
- [Master Project Document](./docs/My-Media-Library_Master_Project_Document.md)  

---

## 🏆 Milestones (Epics)
- **Epic 1:** Git & Project Creation  
- **Epic 2:** Documentation  
- **Epic 3:** UI  
- **Epic 4:** Setup Database + TVDB Integration  
- **Epic 5:** Manage Paths  
- **Epic 6:** Manual Data Input  
- **Epic 7:** Series Management  
- **Epic 8:** Filesystem-Based Series Adding  
- **Epic 9:** Subtitle Management  
- **Epic 10:** Plex Integration  
- **Epic 11:** Tags, Labels & Collections  
- **Epic 12:** Final Cleanup & Optimization  
- **Epic 13:** Stretch Goals  

---

## 🎯 Status  
✅ Core setup is complete — development is ongoing!  
